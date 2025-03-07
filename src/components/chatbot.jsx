import React, { useState, useEffect, useRef } from "react";
// import "./chatbot.css";
// import { Picker } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";

const API_KEY = 'API KEY'; 
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (prompt) => {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const cleanMarkdown = (text) => {
    return text
      .replace(/#{1,6}\s?/g, '')
      .replace(/\\/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const addMessage = (message, isUser) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser }
    ]);
  };

  const handleUserInput = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (userMessage) {
      addMessage(userMessage, true);
      setInput("");

      try {
        const botMessage = await generateResponse(userMessage);
        addMessage(cleanMarkdown(botMessage), false);
      } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, I encountered an error. Please try again.', false);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>PlantBae ChatBot</h1>
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
            <img
              className="profile-image"
              src={message.isUser ? 'user.jpg' : 'bot.jpg'}
              alt={message.isUser ? 'User' : 'Bot'}
            />
            <div className="message-content">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <form onSubmit={handleUserInput}>
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" id="send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;