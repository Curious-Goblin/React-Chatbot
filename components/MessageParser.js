"use client";

export default class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = (message) => {
    this.actionProvider.respond(message);
  };
}
