import { createChatBotMessage } from "react-chatbot-kit";

export const config = {
  botName: "TravelBot",
  initialMessages: [
    createChatBotMessage(`Hi! How can I assist you?`, { loading: true }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#4caf50",
    },
    chatButton: {
      backgroundColor: "#4caf50", 
    },
  },
};
