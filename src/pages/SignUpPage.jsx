import axios from "axios";
import React, { useState } from "react";
import "./SignUpPage.css";
import { useEffect } from "react";
const RegisterForm = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu khi vào trang
  }, []);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Mật khẩu không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7226/api/Auth/register",
        {
          fullName: formData.fullname,
          email: formData.email,
          password: formData.password,
        }
      );

      alert("✅ Đăng ký thành công!");
      console.log("Kết quả:", response.data);
      // chuyển hướng hoặc reset form nếu cần
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      if (error.response && error.response.data) {
        alert(`❌ Lỗi: ${error.response.data.message || "Đăng ký thất bại"}`);
      } else {
        alert("❌ Đã xảy ra lỗi khi đăng ký.");
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Tạo Tài Khoản</h2>

        <div className="form-group">
          <label htmlFor="fullname">Họ và Tên</label>
          <input
            type="text"
            id="fullname"
            placeholder="Nhập họ tên"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>

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
          <label htmlFor="password">Mật Khẩu</label>
          <input
            type="password"
            id="password"
            placeholder="Tạo mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Nhập Lại Mật Khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="register-button">
          Đăng Ký
        </button>

        <p className="login-link">
          Đã có tài khoản? <a href="#">Đăng nhập</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
