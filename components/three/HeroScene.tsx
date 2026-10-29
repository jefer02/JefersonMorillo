"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";
import { profile } from "@/content/profile";
import { encircle } from "@/lib/runes";
import type { CircleLayout } from "./HeroAtmosphere";

type Palette = { line: string; ember: string; opacity: number; additive: boolean };

const PALETTES: Record<"light" | "dark", Palette> = {
  // Ink/vermilion linework by day, gold emission at night.
  light: { line: "#b3402a", ember: "#d9692e", opacity: 0.2, additive: false },
  dark: { line: "#f2c55c", ember: "#f08a3c", opacity: 0.32, additive: true },
};

/**
 * The outer inscription (docs/runas.md) drawn into a canvas strip, sampled in polar space by
 * the shader. The strip is read mirrored so the runes run clockwise with their tops outward.
 */
function useRuneTexture() {
  const texture = useMemo(() => {
    const slots = encircle(profile.inscription.outer);
    const count = slots.length;
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "#fff";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 0.42;
    const cell = canvas.width / count;
    slots.forEach((d, i) => {
      if (!d) return;
      ctx.save();
      ctx.translate(i * cell + cell / 2, canvas.height / 2);
      ctx.scale(3.3, 3.3);
      ctx.translate(-5, -7);
      ctx.stroke(new Path2D(d));
      ctx.restore();
    });
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.anisotropy = 4;
    return tex;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

const circleVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const circleFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform sampler2D uRunes;
  varying vec2 vUv;

  const float TAU = 6.28318530718;

  float ring(float r, float radius, float w) {
    return 1.0 - smoothstep(0.0, w, abs(r - radius));
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    float u = atan(p.y, p.x) / TAU + 0.5;
    float aa = fwidth(r) * 1.25;
    float m = 0.0;

    // Outer rings and the rune band, turning slowly clockwise.
    float uo = fract(u + uTime * 0.0045);
    m += ring(r, 0.972, aa) * 0.55;
    m += ring(r, 0.94, aa * 1.6);
    if (r > 0.79 && r < 0.925) {
      float v = (r - 0.79) / 0.135;
      m += texture2D(uRunes, vec2(1.0 - uo, v)).a;
    }
    m += ring(r, 0.77, aa * 1.6);
    float dots = step(0.55, fract(uo * 220.0));
    m += ring(r, 0.745, aa) * dots * 0.6;

    // Inner system, turning the other way: a 12-tick clock and a heptagon of nodes.
    float ui = fract(u - uTime * 0.007);
    float tickArc = abs(fract(ui * 12.0 + 0.5) - 0.5) / 12.0 * TAU * r;
    float major = step(0.5, 1.0 - abs(fract(ui * 4.0 + 0.5) - 0.5) * 8.0);
    float tickTop = mix(0.6, 0.625, major);
    m += (1.0 - smoothstep(0.0, aa * 1.6, tickArc)) * step(0.56, r) * step(r, tickTop);
    m += ring(r, 0.56, aa) * 0.8;
    m += ring(r, 0.42, aa * 1.4);

    float n = 7.0;
    float seg = TAU / n;
    float ang = mod(ui * TAU, seg) - seg * 0.5;
    float edge = 0.66 * cos(seg * 0.5) / cos(ang);
    m += ring(r, edge, aa * 1.3) * 0.75;

    // A pulse of mana travelling along the outer ring.
    float head = fract(u - uTime * 0.05);
    m += ring(r, 0.94, aa * 5.0) * pow(1.0 - head, 18.0) * 1.4;

    float alpha = clamp(m, 0.0, 1.0) * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function CircleMesh({ palette, layout }: { palette: Palette; layout: CircleLayout }) {
  const runes = useRuneTexture();
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(palette.line) },
      uOpacity: { value: palette.opacity },
      uRunes: { value: runes },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runes],
  );

  useEffect(() => {
    const u = material.current?.uniforms;
    if (!u) return;
    u.uColor.value.set(palette.line);
    u.uOpacity.value = palette.opacity;
  }, [palette]);

  // Pixel layout from the DOM (centered on the portrait) mapped to world units.
  const unit = viewport.height / layout.h;
  const diameter = layout.d * unit;
  const x = (layout.cx - layout.w / 2) * unit;
  const y = -(layout.cy - layout.h / 2) * unit;

  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
    const progress = Math.min(window.scrollY / window.innerHeight, 1);
    if (group.current) {
      group.current.rotation.x = -progress * 0.95;
      group.current.scale.setScalar(1 - progress * 0.35);
    }
  });

  return (
    <group ref={group} position={[x, y, 0]}>
      <mesh>
        <planeGeometry args={[diameter, diameter]} />
        <shaderMaterial
          ref={material}
          vertexShader={circleVertex}
          fragmentShader={circleFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}

const emberVertex = /* glsl */ `
  uniform float uTime;
  uniform float uHeight;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float speed = 0.18 + aSeed * 0.35;
    p.y = mod(p.y + uTime * speed, uHeight) - uHeight * 0.5;
    p.x += sin(uTime * 0.6 + aSeed * 40.0) * 0.12 + uPointer.x * 0.25 * (0.4 + aSeed);
    p.y += uPointer.y * 0.12 * aSeed;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.0 + aSeed * 4.0) * uPixelRatio;
    float edge = smoothstep(-uHeight * 0.5, -uHeight * 0.3, p.y) * (1.0 - smoothstep(uHeight * 0.25, uHeight * 0.5, p.y));
    vAlpha = edge * (0.35 + 0.65 * abs(sin(uTime * 1.3 + aSeed * 20.0)));
  }
`;

const emberFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
  }
`;

function Embers({ palette, count }: { palette: Palette; count: number }) {
  const { viewport, gl } = useThree();
  const pointer = useRef(new THREE.Vector2());
  const material = useRef<THREE.ShaderMaterial>(null);

  // Seeded, so the field is stable across renders.
  const { positions, seeds } = useMemo(() => {
    const rand = mulberry32(1902);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * viewport.width * 1.1;
      positions[i * 3 + 1] = rand() * viewport.height;
      positions[i * 3 + 2] = (rand() - 0.5) * 2;
      seeds[i] = rand();
    }
    return { positions, seeds };
  }, [count, viewport.width, viewport.height]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHeight: { value: viewport.height },
      uPixelRatio: { value: gl.getPixelRatio() },
      uPointer: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color(palette.ember) },
      uOpacity: { value: palette.additive ? 0.9 : 0.55 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    const u = material.current?.uniforms;
    if (!u) return;
    u.uColor.value.set(palette.ember);
    u.uOpacity.value = palette.additive ? 0.9 : 0.55;
    u.uHeight.value = viewport.height;
  }, [palette, viewport.height]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const u = material.current?.uniforms;
    if (!u) return;
    // Per-frame GPU uniform writes are the intended R3F pattern, outside React state.
    // eslint-disable-next-line react-hooks/immutability
    u.uTime.value = state.clock.elapsedTime;
    u.uPointer.value.lerp(pointer.current, Math.min(1, delta * 2));
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={emberVertex}
        fragmentShader={emberFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

export default function HeroScene({ active, layout, onReady }: { active: boolean; layout: CircleLayout; onReady: () => void }) {
  const { resolvedTheme } = useTheme();
  const palette = PALETTES[resolvedTheme === "dark" ? "dark" : "light"];
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 100 : 350;

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <CircleMesh palette={palette} layout={layout} />
      <Embers palette={palette} count={count} />
      <ReadySignal onReady={onReady} />
    </Canvas>
  );
}
