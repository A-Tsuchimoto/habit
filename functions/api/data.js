const KEY = 'habits';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS });
  }

  if (request.method === 'GET') {
    const data = await env.HABIT_DATA.get(KEY, { type: 'json' });
    return Response.json(data ?? null, { headers: CORS });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    await env.HABIT_DATA.put(KEY, JSON.stringify(body));
    return Response.json({ ok: true }, { headers: CORS });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
