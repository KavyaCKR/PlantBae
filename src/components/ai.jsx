import { useState } from "react";
import api from "../api/db";

export default function Ai() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  };

  const submit = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    const response = await api.ai(input);
    setLoading(false);
    const aiMessage = { text: formatText(response.data.content), sender: "ai" };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    
    
    <div
      style={{
        width: "90%",
        maxWidth: "800px",
        margin: "20px auto",
        background: "white",
        borderRadius: "15px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        border: "2px solid green",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              background: msg.sender === "user" ? "#d1e7dd" : "#e0ffe0",
              padding: "12px",
              borderRadius: "10px",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
              maxWidth: "70%",
            }}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          ></div>
        ))}
        {loading && (
          <div
            style={{
              background: "#e0ffe0",
              padding: "12px",
              borderRadius: "10px",
              alignSelf: "flex-start",
              marginBottom: "10px",
              maxWidth: "70%",
            }}
          >
            Thinking...
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          padding: "15px",
          background: "white",
          borderTop: "2px solid green",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid green",
            borderRadius: "8px",
            color: "black",
          }}
        />
        <button
          onClick={submit}
          style={{
            padding: "10px 15px",
            border: "none",
            background: "green",
            color: "white",
            cursor: "pointer",
            marginLeft: "10px",
            borderRadius: "8px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}