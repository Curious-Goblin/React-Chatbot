"use client";
import Chatbot from "react-chatbot-kit";
import { config } from "./Config";
import "react-chatbot-kit/build/main.css";
import "./ChatBotStyle.css";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

export default function ChatBot() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const chatbotWrapperStyle = {
    width: "500px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <div style={chatbotWrapperStyle}>
        <Chatbot
          config={config} 
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
    </div>
  );
}
