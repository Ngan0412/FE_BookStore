import axios from "axios";
import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({
    FamilyName: "",
    GivenName: "",
    Phone: "",
    Password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate không được để trống
    const requiredFields = [
      "FamilyName",
      "GivenName",
      "Phone",
      "Address",
      "Password",
      "confirmPassword",
    ];

    const fieldLabels = {
      FamilyName: "Họ",
      GivenName: "Tên",
      Phone: "Số điện thoại",
      Address: "Địa chỉ",
      Password: "Mật khẩu",
      confirmPassword: "Nhập lại mật khẩu",
    };
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`❌ Trường "${fieldLabels[field]}" không được để trống.`);
        return;
      }
    }

    // Validate số điện thoại VN
    const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
    if (!vnPhoneRegex.test(formData.Phone)) {
      alert("❌ Số điện thoại không đúng định dạng Việt Nam (VD: 0912345678)");
      return;
    }

    // Kiểm tra mật khẩu trùng khớp
    if (formData.Password !== formData.confirmPassword) {
      alert("❌ Mật khẩu không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7221/api/UserCustomers",
        {
          familyName: formData.FamilyName,
          givenName: formData.GivenName,
          phone: formData.Phone,
          address: formData.Address,
          Password: formData.Password,
        }
      );

      alert("✅ Đăng ký thành công!");
      console.log("Kết quả:", response.data);
      // navigate("/login"); // Nếu muốn chuyển hướng
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
          <label htmlFor="FamilyName">Họ</label>
          <input
            type="text"
            id="FamilyName"
            placeholder="Nhập họ"
            value={formData.FamilyName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="GivenName">Tên</label>
          <input
            type="text"
            id="GivenName"
            placeholder="Nhập tên"
            value={formData.GivenName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Phone">Số điện thoại</label>
          <input
            type="tel"
            id="Phone"
            placeholder="Nhập SĐT"
            value={formData.Phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Phone">Địa chỉ</label>
          <input
            type="tel"
            id="Address"
            placeholder="Nhập Địa Chỉ"
            value={formData.Address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Password">Mật Khẩu</label>
          <input
            type="password"
            id="Password"
            placeholder="Tạo mật khẩu"
            value={formData.Password}
            onChange={handleChange}
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
          />
        </div>

        <button type="submit" className="register-button">
          Đăng Ký
        </button>

        <p className="login-link">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
