import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__main">
        <div className="header__main__logo">
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
          <input type="text" className="input-search" />
          <button className="btn btn-search">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
