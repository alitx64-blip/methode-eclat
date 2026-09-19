const encoder = new TextEncoder();

function readCookie(request, name) {
  const cookie = request.headers.get("cookie") || "";
  return cookie.split(";").map(value => value.trim()).find(value => value.startsWith(`${name}=`))?.slice(name.length + 1) || "";
}

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

async function validSession(token, secret) {
  const [expires, suppliedSignature] = token.split(".");
  if (!expires || !suppliedSignature || Number(expires) < Date.now()) return false;
  return safeEqual(suppliedSignature, await signature(secret, expires));
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // La protection ne s'active qu'une fois les deux secrets Cloudflare configurés.
  if (!env.ECLAT_PASSWORD || !env.ECLAT_SESSION_SECRET) return context.next();

  if (url.pathname === "/connexion.html" || url.pathname.startsWith("/api/auth/")) return context.next();

  const token = readCookie(request, "eclat_session");
  if (await validSession(token, env.ECLAT_SESSION_SECRET)) return context.next();

  if (request.method !== "GET" && request.method !== "HEAD") {
    return Response.json({ message: "Accès non autorisé." }, { status: 401 });
  }

  const destination = `${url.pathname}${url.search}`;
  return Response.redirect(`${url.origin}/connexion.html?retour=${encodeURIComponent(destination)}`, 302);
}
