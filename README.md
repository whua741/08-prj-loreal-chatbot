# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

When deploying through Cloudflare, make sure your API request body (in `script.js`) includes a `messages` array and handle the response by extracting `data.choices[0].message.content`.

## How to finish the chatbot

1. Open Cloudflare Workers and create a new Worker.
2. Paste the code from `RESOURCE_cloudflare-worker.js` into the Worker editor.
3. In the Worker settings, add a secret named `OPENAI_API_KEY` and paste your OpenAI key there.
4. Deploy the Worker and copy the public URL.
5. Open `script.js` and replace the placeholder URL with your real Worker URL.
6. Reload the page and test the chatbot.

If it still fails, check the browser console and the Cloudflare Worker logs to see the exact error message.

Enjoy building your L’Oréal beauty assistant! 💄
