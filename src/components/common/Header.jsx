import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [query, setQuery] = useState(""); // Lưu từ khóa tìm kiếm
  const navigate = useNavigate(); // Dùng để chuyển trang

  const handleSearch = () => {
    navigate(`/search${query.trim() ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="header">
      <div className="header__main">
        <div className="header__main__logo" onClick={() => navigate("/")}>
          <div className="icon">
            <img src="../styles/img/logo2.jpg" alt="logo" className="logo" />
          </div>
        </div>

        <div className="header__main__catelogy">
          <div className="icon">
            <i className="fa-solid fa-table-cells"></i>
          </div>
        </div>

        <div className="header__main__search">
          <input
            type="text"
            className="input-search"
            placeholder="Tìm kiếm sách..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Bấm Enter để tìm
          />
          <button className="btn btn-search" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="header__main__info">
          <div className="header__main__shoppingCard">
            <div className="icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="text">Giỏ Hàng</div>
          </div>

          <div className="header__main__login">
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="text">Tài Khoản</div>

            {/* Dropdown khi hover */}
            <div className="login-dropdown">
              <button className="login-btn">Đăng nhập</button>
              <button className="register-btn">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
