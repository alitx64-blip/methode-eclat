const encoder = new TextEncoder();

function safeEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

async function signature(secret, value) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
  return [...bytes].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function onRequestPost({ request, env }) {
  if (!env.ECLAT_PASSWORD || !env.ECLAT_SESSION_SECRET) {
    return Response.json({ message: "La protection ÉCLAT n’est pas encore configurée." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  if (!safeEqual(String(body.password || ""), env.ECLAT_PASSWORD)) {
    return Response.json({ message: "Mot de passe incorrect." }, { status: 401 });
  }

  const remember = body.remember === true;
  const duration = remember ? 30 * 24 * 60 * 60 : 12 * 60 * 60;
  const expires = String(Date.now() + duration * 1000);
  const token = `${expires}.${await signature(env.ECLAT_SESSION_SECRET, expires)}`;
  const maxAge = remember ? `; Max-Age=${duration}` : "";

  return Response.json({ ok: true }, {
    headers: {
      "set-cookie": `eclat_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax${maxAge}`,
      "cache-control": "no-store"
    }
  });
}
