import React, { useState } from "react";
import "./LoginPage.css"; // CSS chuyển từ login.css nếu có
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const LoginPage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Ngăn chặn reload trang
    alert("Đăng nhập với: " + formData.email);
    navigate("/"); // ✅ Điều hướng về trang Home
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng Nhập</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Đăng nhập
        </button>
        <div className="common_login">
          <p className="signup-link">
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </p>
          <p className="signup-forget">
            <Link to="/forgot">Quên Mật Khẩu</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
