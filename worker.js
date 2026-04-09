const KEY = 'habits';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/data') {
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

    // Static assets (index.html etc.)
    return env.ASSETS.fetch(request);
  },
};
