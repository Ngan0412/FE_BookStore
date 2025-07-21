import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>Nhà Sách Online</h2>
          <p>
            Chuyên cung cấp sách học tập, kỹ năng và văn học uy tín, chất lượng.
            Giao hàng toàn quốc.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li>
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Sản phẩm</a>
            </li>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Liên hệ</h3>
          <p>Email: support@nhasach.vn</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Địa chỉ: 123 Đường Sách, Q.1, TP.HCM</p>
        </div>

        <div className="footer-section social">
          <h3>Kết nối</h3>
          <div className="social-icons">
            <a href="#">
              <img src="/images/facebook-icon.png" alt="Facebook" />
            </a>
            <a href="#">
              <img src="/images/instagram-icon.png" alt="Instagram" />
            </a>
            <a href="#">
              <img src="/images/youtube-icon.png" alt="YouTube" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Nhà Sách Online. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
