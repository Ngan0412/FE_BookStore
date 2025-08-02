import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import "./LoginPage.css"; // CSS chuyển từ login.css nếu có
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const { login } = useContext(UserContext); // 🟢 Dùng login từ context

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Ngăn chặn reload trang
    try {
      const response = await axios.post(
        "https://localhost:7221/api/UserCustomers/login",
        {
          phone: formData.Phone,
          password: formData.password,
        }
      );

      // ✅ Nếu đăng nhập thành công
      const userData = response.data;
      console.log("✅ Đăng nhập thành công:", userData);

      // Lưu token hoặc thông tin người dùng nếu cần
      login(userData);
      // Chuyển hướng về trang chủ
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);

      if (error.response && error.response.data) {
        alert(`❌ Lỗi: ${error.response.data.message || "Đăng nhập thất bại"}`);
      } else {
        alert("❌ Đã xảy ra lỗi khi đăng nhập.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng Nhập</h2>
        <div className="form-group">
          <label htmlFor="email">Số điện thoại</label>
          <input
            id="Phone"
            placeholder="Nhập SĐT"
            value={formData.Phone}
            onChange={handleChange}
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
