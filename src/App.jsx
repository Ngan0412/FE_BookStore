import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/Reset.css";
import "./App.css";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookDetailPage from "./pages/bookDetailPage.jsx";
import ProductSearchPage from "./pages/ProductSearchPage.jsx";
import CartPage from "./pages/ShoppingCartPage.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<ProductSearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
