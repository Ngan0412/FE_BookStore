import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaTimes } from "react-icons/fa";
import "./ChatBot.css";

const ChatBot = ({ setSuggestedProductsFromBot }) => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getBotResponse = async (msg) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: msg }),
      });

      if (!response.ok) throw new Error("Lỗi server!");
      const data = await response.json();
      const products = data.products || [];
      const suggestions = data.suggestions || [];
      const isProductArray = Array.isArray(products);
      if (setSuggestedProductsFromBot && Array.isArray(products)) {
        const normalizedProducts = products.map((product) => ({
          id: product.Id,
          title: product.Title,
          price: product.Price,
          image: product.Image,
        }));
        setSuggestedProductsFromBot((prev) => [...prev, ...normalizedProducts]);
      }
      if (setSuggestedProductsFromBot && Array.isArray(suggestions)) {
        setSuggestedProductsFromBot((prev) => [...prev, ...suggestions]);
      }
      return {
        sender: "bot",
        text: isProductArray ? "Kết quả:" : products, // Trả chuỗi lỗi hoặc thông báo từ backend
        products: isProductArray ? products : [], // Nếu không phải mảng thì đừng hiển thị
        suggestions: suggestions,
      };
    } catch (error) {
      console.error("Lỗi:", error);
      return { sender: "bot", text: "Đã xảy ra lỗi khi gọi bot." };
    }
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setSuggestions([]);
    setProducts([]);
    const botResponse = await getBotResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse.text }]);
    setSuggestions(botResponse.suggestions || []);
    setProducts(botResponse.products || []);
    setLoading(false);
  };

  return (
    <>
      <button
        className="chat-toggle-btn"
        onClick={() => setShowChat(!showChat)}
      >
        {showChat ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {showChat && (
        <div className="chatbot-container">
          <div className="chatbox">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}

            {Array.isArray(products) && products.length > 0 && (
              <div className="suggestions-grid-container">
                <h3 className="suggestion-title">Sản phẩm</h3>
                <div className="suggestions-grid">
                  {products.map((book) => (
                    <div
                      key={book.Id}
                      className="suggestion-card"
                      onClick={() => navigate(`/book/${book.id}`, "_blank")}
                    >
                      <img   src={`http://localhost:5286/${book.image}`} alt={book.Title} />
                      <h4>{book.Title}</h4>
                      <p>{parseInt(book.Price).toLocaleString()} VNĐ</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(suggestions) && suggestions.length > 0 && (
              <div className="suggestions-grid-container">
                <h3 className="suggestion-title">Sản phẩm gợi ý</h3>
                <div className="suggestions-grid">
                  {suggestions.map((book) => (
                    <div
                      key={book.id}
                      className="suggestion-card"
                       onClick={() => window.open(`/book/${book.id}`, "_blank")}
                    >
                      <img    src={`http://localhost:5286/${book.image}`} alt={book.title} />
                      <h4>{book.title}</h4>
                      <p>{parseInt(book.price).toLocaleString()} VNĐ</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="input-area">
            <input
              type="text"
              value={input}
              placeholder="Nhập tin nhắn..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
