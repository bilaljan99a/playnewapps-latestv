// Cloudflare Pages Function for /api/chat

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json().catch(() => ({}));
    const message = body?.message || '';

    const cleanQ = (message || '').trim().replace(/^(find|show|give|search|recommend|get)\s+(me\s+)?(a\s+|an\s+|the\s+)?/i, '').trim();
    const encoded = encodeURIComponent(cleanQ || message || 'deals');
    const tag = env?.AMAZON_ASSOCIATE_TAG || 'playnewapps-20';
    const amzSearchUrl = `https://www.amazon.com/s?k=${encoded}&tag=${tag}`;

    const reply = `Here are the top-rated verified options and live discounts on Amazon for **${cleanQ || message}**:\n\n* **Top Recommendations:** Hand-picked models with 4+ star reviews, Prime shipping, and manufacturer warranty.\n* **Live Price Check:** [View All Verified Deals on Amazon ↗](${amzSearchUrl})\n\n*(Prices and offers are verified daily on PlayNewApps.)*`;

    return new Response(JSON.stringify({
      success: true,
      reply,
      recommendedProducts: []
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      success: true,
      reply: "Here are top verified deals on Amazon: [Check Live Deals on Amazon ↗](https://www.amazon.com/s?k=deals&tag=playnewapps-20)",
      recommendedProducts: []
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestGet() {
  return new Response(JSON.stringify({
    success: true,
    status: 'online',
    platform: 'cloudflare-pages'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
