"use client";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "e427543e7a204b37958c776cb52cf6c9", 
  baseURL: "https://api.aimlapi.com",
  dangerouslyAllowBrowser: true,
});

export default class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    systemMessage = "You are a virtual travel planner specializing in helping users plan vacations.", 
    apiConfig = { temperature: 0.5, max_tokens: 50 }
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setStateFunc = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
    this.systemMessage = systemMessage;
    this.apiConfig = apiConfig;
    this.messageQueue = [];
  }
  timer = (ms) => new Promise((res) => setTimeout(res, ms));
  
  callGenAI = async (prompt) => {
    try {
      console.log("System Message:", this.systemMessage);
      const requestData = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a virtual travel planner specializing in helping users plan vacations." },
          { role: "user", content: prompt },
        ],
        ...this.apiConfig,
      };
      console.log("Request Data:", requestData);
  
      const chatCompletion = await openai.chat.completions.create(requestData);
      return chatCompletion.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      return "Sorry, I couldn't process your request. Please try again later.";
    }
  };
  
  

  showLoadingIndicator = (show) => {
    const loadingMessage = this.createChatBotMessage("Typing...", {
      delay: 0,
    });

    if (show) {
      this.updateChatBotMessage(loadingMessage);
    } else {
      this.setStateFunc((prevState) => ({
        ...prevState,
        messages: prevState.messages.filter(
          (message) => message.message !== "Typing..."
        ),
      }));
    }
  };

  processQueue = async () => {
    while (this.messageQueue.length > 0) {
      const userMessage = this.messageQueue.shift();

      try {
        this.showLoadingIndicator(true); 
        const responseFromGPT = await this.callGenAI(userMessage);
        this.showLoadingIndicator(false);

        const lines = responseFromGPT
          .split("\n")
          .filter((line) => line.trim().length > 0);

        for (const line of lines) {
          const botMessage = this.createChatBotMessage(line.trim());
          this.updateChatBotMessage(botMessage);
          await this.timer(1000);
        }
      } catch (error) {
        console.error("Error processing message queue:", error);
        this.showLoadingIndicator(false);
      }
    }
  };

  respond = (message) => {
    this.messageQueue.push(message);
    if (this.messageQueue.length === 1) {
      this.processQueue();
    }
  };

  updateChatBotMessage = (message) => {
    this.setStateFunc((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}
