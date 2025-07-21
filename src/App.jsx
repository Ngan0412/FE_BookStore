import React from "react";
import "./components/Reset.css";
import "./App.css";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import CategorySection from "./components/home/CategoryProduct.jsx";
import BookList from "./components/home/ProductGrid.jsx";
import BookSuggestions from "./components/common/SuggestProductGrid.jsx";
import ChatBot from "./components/home/ChatBot.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <CategorySection />
      <BookList />
      <BookSuggestions />
      <ChatBot/>
      <Footer />
    </div>
  );
}
export default App;
