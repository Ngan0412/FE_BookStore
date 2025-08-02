import React from "react";
import "../pages/ForGotPWPage.css";

const ForgotPasswordPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    try {
      const response = await fetch(
        "https://localhost:7226/api/Auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (response.ok) {
        alert("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.");
      } else {
        const errorData = await response.json();
        alert("Lỗi: " + (errorData.message || "Không thể gửi email."));
      }
    } catch (error) {
      alert("Đã xảy ra lỗi khi gửi yêu cầu: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Quên mật khẩu</h2>
        <div className="form-group">
          <label htmlFor="email">Email đã đăng ký</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email của bạn"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Gửi liên kết đặt lại mật khẩu
        </button>
        <div className="signup-link">
          <a href="/login">Quay lại đăng nhập</a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
