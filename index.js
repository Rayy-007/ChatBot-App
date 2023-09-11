const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");

let userMessage;

const handleChat = () => {
  userMessage = chatInput.value.trim();
  console.log(userMessage);
};

sendChatBtn.addEventListener("click", handleChat);
