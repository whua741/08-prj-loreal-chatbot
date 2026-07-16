/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendButton = document.getElementById("sendBtn");

// Replace this with your actual Cloudflare Worker URL.
const workerUrl = "https://plain-feather-a209.hua-wu.workers.dev/";

// Show a friendly welcome message when the page loads.
chatWindow.innerHTML = "<p>👋 Hello! How can I help you today?</p>";

// Add a message bubble to the chat window.
function addMessage(text, role) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`;
  messageDiv.textContent = text;
  chatWindow.appendChild(messageDiv);
}

// Handle form submit.
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();

  // Stop if the user did not type anything.
  if (!message) {
    return;
  }

  // Show the user's message right away.
  addMessage(message, "user");
  userInput.value = "";
  userInput.disabled = true;
  sendButton.disabled = true;

  if (workerUrl.includes("your-subdomain")) {
    addMessage(
      "The worker URL is still the placeholder value. Replace it in script.js with your real Cloudflare Worker URL so the chatbot can reply.",
      "assistant",
    );
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
    return;
  }

  try {
    // Send the message to the Cloudflare Worker.
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Worker returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    // Read the reply from the worker response.
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a reply.";

    addMessage(reply, "assistant");
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    addMessage(`Sorry, something went wrong. ${errorMessage}`, "assistant");
  } finally {
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
  }
});
