const { handleChat } = require('../services/chat-assistant');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      status: 'online',
      model: 'gemini-3.1-flash-lite',
      associateTag: process.env.AMAZON_ASSOCIATE_TAG || 'playnewapps-20'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Valid message string is required.' });
    }

    const result = await handleChat(message, history || []);
    return res.status(200).json({
      success: true,
      reply: result.reply,
      recommendedProducts: result.recommendedProducts || []
    });
  } catch (err) {
    console.error('[API /api/chat Serverless] Error:', err);
    return res.status(200).json({
      success: true,
      reply: `Here are the top-rated live deals and customer choices on Amazon:\n\n* **Live Price Check:** [View All Verified Deals on Amazon ↗](https://www.amazon.com/s?k=${encodeURIComponent(req.body?.message || 'deals')}&tag=playnewapps-20)`,
      recommendedProducts: []
    });
  }
};
