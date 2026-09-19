export async function onRequestPost() {
  return Response.json({ ok: true }, {
    headers: {
      "set-cookie": "eclat_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      "cache-control": "no-store"
    }
  });
}
