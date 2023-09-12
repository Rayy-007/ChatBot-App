const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";

//Create a chat <li> element with passed message and clasName
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;

  chatLi.innerHTML = chatContent;

  return chatLi;
};

const generateResponse = (incomingChatLI) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLI.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    }),
  };

  // Sending the POST request to open ai api and ger response
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textcontent = data.choices[0].message.content;
    })
    .catch((err) => {
      messageElement.textcontent =
        "Oops! Something went wrong. Please try again.";
    });
};

const handleChat = () => {
  userMessage = chatInput.value.trim();

  if (!userMessage) return;

  // Appending the user's message to the chat box
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));

  setTimeout(() => {
    // Bot is thinking for response back
    const incomingChatLI = createChatLi("Thinking...", "incoming");
    chatBox.appendChild(incomingChatLI);
    generateResponse(incomingChatLI);
  }, 600);
};

sendChatBtn.addEventListener("click", handleChat);
