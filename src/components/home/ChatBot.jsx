import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import "./ChatBot.css";
const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    const botResponse = getBotResponse(input);
    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes("chào")) {
      return { sender: "bot", text: "Chào bạn! Rất vui được hỗ trợ." };
    } else if (lower.includes("giờ")) {
      return { sender: "bot", text: `Bây giờ là ${new Date().toLocaleTimeString()}` };
    } else {
      return { sender: "bot", text: "Xin lỗi, tôi chưa hiểu ý bạn." };
    }
  };

  return (
    <>
      {/* Nút bật/tắt chatbot */}
      <button className="chat-toggle-btn" onClick={() => setShowChat(!showChat)}>
        {showChat ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chatbot box */}
      {showChat && (
        <div className="chatbot-container">
          <div className="chatbox">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              placeholder="Nhập tin nhắn..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatBot;
