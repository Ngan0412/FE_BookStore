import React from "react";
import CategorySection from "../components/home/CategoryProduct.jsx";
import BookList from "../components/home/ProductGrid.jsx";
import BookSuggestions from "../components/common/SuggestProductGrid.jsx";
import ChatBot from "../components/home/ChatBot.jsx";
import "../pages/HomePage.css";

function HomePage() {
  return (
    <div className="HomePage">
      <CategorySection />
      <BookList />
      <BookSuggestions />
      <ChatBot />
    </div>
  );
}
export default HomePage;
