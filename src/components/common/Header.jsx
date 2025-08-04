import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import "./Header.css";

const Header = () => {
  const [query, setQuery] = useState("");
  // const [user, setUser] = useState(null); // ✅ Lưu user nếu đã đăng nhập
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout(); // dùng hàm logout từ UserContext
    navigate("/login");
  };

  const handleSearch = () => {
    navigate(`/search${query.trim() ? `?q=${encodeURIComponent(query)}` : ""}`);
    window.scrollTo(0, 0);
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

        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="header__main__search">
            <input
              type="text"
              className="input-search"
              placeholder="Tìm kiếm sách..."
              value={query}
              name="search"
              autoComplete="new-password"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="btn btn-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>

        <div className="header__main__info">
          <div
            className="header__main__shoppingCard"
            onClick={() => navigate("/cart")}
          >
            <div className="icon" style={{ position: "relative" }}>
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
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
              {user ? (
                <>
                  <button
                    className="info-btn"
                    onClick={() => navigate("/profile")}
                  >
                    Thông tin khách hàng
                  </button>
                  <button
                    className="info-btn"
                    onClick={() => navigate("/delivery")}
                  >
                    Đơn hàng của tôi
                  </button>
                  <button className="info-btn" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="login-btn"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </button>

                  <button
                    className="register-btn"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
