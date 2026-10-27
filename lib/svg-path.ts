import { round } from "./rng";

// Bakes an affine transform (translate · rotate · scale · translate) into a path made of
// M/L/Q (absolute) and m/a (relative) commands, so many runes become one <path>.

type Affine = { tx: number; ty: number; rot: number; scale: number; ox: number; oy: number };

const TOKEN = /([MLQmalq])|(-?\d*\.?\d+(?:e-?\d+)?)/g;

export function transformPath(d: string, t: Affine): string {
  const cos = Math.cos((t.rot * Math.PI) / 180);
  const sin = Math.sin((t.rot * Math.PI) / 180);
  const abs = (x: number, y: number) => {
    const px = (x + t.ox) * t.scale;
    const py = (y + t.oy) * t.scale;
    return [round(t.tx + px * cos - py * sin), round(t.ty + px * sin + py * cos)];
  };
  const rel = (x: number, y: number) => {
    const px = x * t.scale;
    const py = y * t.scale;
    return [round(px * cos - py * sin), round(px * sin + py * cos)];
  };

  const tokens = [...d.matchAll(TOKEN)].map((m) => m[0]);
  const out: string[] = [];
  let i = 0;
  let cmd = "";
  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) cmd = tokens[i++];
    const n = () => Number(tokens[i++]);
    switch (cmd) {
      case "M":
      case "L":
        out.push(cmd, ...abs(n(), n()).map(String));
        break;
      case "Q": {
        const c = abs(n(), n());
        const p = abs(n(), n());
        out.push("Q", ...c.map(String), ...p.map(String));
        break;
      }
      case "m":
      case "l":
        out.push(cmd, ...rel(n(), n()).map(String));
        break;
      case "a": {
        const rx = n() * t.scale;
        const ry = n() * t.scale;
        const xr = n() + t.rot;
        const large = n();
        const sweep = n();
        const e = rel(n(), n());
        out.push("a", String(round(rx)), String(round(ry)), String(round(xr)), String(large), String(sweep), ...e.map(String));
        break;
      }
      default:
        throw new Error(`Unsupported path command ${cmd}`);
    }
  }
  return out.join(" ");
}
