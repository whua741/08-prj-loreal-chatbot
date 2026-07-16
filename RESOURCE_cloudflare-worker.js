// Copy this code into your Cloudflare Worker script

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const apiKey = env.OPENAI_API_KEY; // Make sure to name your secret OPENAI_API_KEY in the Cloudflare Workers dashboard
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const userInput = await request.json();

    const systemPrompt = `You are a friendly L'Oréal beauty assistant. Help users with skincare routines, product recommendations, and general beauty advice. Use emojis to make the conversation warm and engaging. Keep responses concise, helpful, and natural. Reply in plain text only. If a user asks about anything unrelated to L'Oréal products, beauty routines, skincare, makeup, haircare, or general beauty topics, politely refuse and redirect the conversation back to beauty-related help. Do not answer unrelated questions.`;

    const requestBody = {
      model: "gpt-4.1",
      messages: [
        { role: "system", content: systemPrompt },
        ...userInput.messages,
      ],
      max_completion_tokens: 300,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), { headers: corsHeaders });
  },
};
