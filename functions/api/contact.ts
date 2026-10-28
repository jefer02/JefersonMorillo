// Cloudflare Pages Function: POST /api/contact. The site itself is a static export,
// so this is the only code that runs on the server.

import { handleContact, type ContactEnv } from "../../lib/contact";

type Context = { request: Request; env: ContactEnv };

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ status: "error", message: "Solicitud inválida." }, { status: 400 });
  }
  const state = await handleContact(formData, ip, env);
  return Response.json(state, { headers: { "Cache-Control": "no-store" } });
}
