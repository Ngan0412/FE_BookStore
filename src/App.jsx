import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/Reset.css";
import "./App.css";

import { UserProvider } from "./contexts/UserProvider.jsx"; // ✅ Đang dùng

import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookDetailPage from "./pages/bookDetailPage.jsx";
import ProductSearchPage from "./pages/ProductSearchPage.jsx";
import CartPage from "./pages/ShoppingCartPage.jsx";
import RegisterForm from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LogInPage.jsx";
import ForgotPasswordPage from "./pages/ForGotPWPage.jsx";
import CheckoutPage from "./pages/CheckOutPage.jsx";

function App() {
  return (
    <UserProvider>
      {" "}
      {/* ✅ Bọc toàn bộ app */}
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<ProductSearchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/book/:bookId" element={<BookDetailPage />} />
              <Route path="/forgot" element={<ForgotPasswordPage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
