// Import OpenAI
const openai = require('openai');

// Initialize chat history
let message = [];

// Get DOM elements
const chatHistory = document.getElementById('chatHistory');
const inputBox = document.getElementById('inputBox');
const sendButton = document.getElementById('sendButton');

// Event listener for send button
sendButton.addEventListener('click', async () => {
    const userprompt = inputBox.value;
    inputBox.value = '';

    // Append user message to chat history
    message.push({"role": "user", "content": userprompt});
    appendMessageToChatHistory("user", userprompt);

    // System prompt
    const systemprompt = "The assistant is typing...";
    message.push({"role": "system", "content": systemprompt});
    appendMessageToChatHistory("system", systemprompt);

    // Get response from OpenAI API
    const response = await openai.ChatCompletion.create({
        model: "gpt-4",
        messages: message,
        temperature: 0.2,
        max_tokens: 4000,
        frequency_penalty: 0.9
    });

    // Append AI message to chat history
    const gpt_message = response.choices[0].message.content;
    message.push({"role": "system", "content": gpt_message});
    appendMessageToChatHistory("system", gpt_message);
});

// Function to append message to chat history
function appendMessageToChatHistory(role, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(role);
    messageElement.textContent = content;
    chatHistory.appendChild(messageElement);
}