import React, { useState } from "react";
import "../pages/CheckOutPage.css"; // Đảm bảo đường dẫn đúng
import { useNavigate } from "react-router-dom";
const ChangePWPage = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }

    try {
      const Customer = JSON.parse(localStorage.getItem("user")) || {};
      const response = await fetch(
        `https://localhost:7221/api/UserCustomers/${Customer.id}/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
          }),
        }
      );

      if (response.ok) {
        alert("Đổi mật khẩu thành công!");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const error = await response.text();
        alert("Thất bại: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi gọi API");
    }
  };
  return (
    <div className="account-container">
      {/* Sidebar */}
      <aside className="account-sidebar">
        <h2>Tài khoản của tôi</h2>
        <ul>
          <li onClick={() => navigate("/profile")}>Thông tin tài khoản</li>
          <li onClick={() => navigate("/delivery")}>Đơn hàng của tôi</li>
          <li className="active">Đổi mật khẩu</li>
        </ul>
      </aside>

      {/* Content */}
      <main className="account-content">
        <h1>Thay đổi mật khẩu</h1>

        <div className="info-group">
          <label>Mật khẩu hiện tại:</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
            className="input-field"
          />
        </div>

        <div className="info-group">
          <label>Mật khẩu mới:</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            className="input-field"
          />
        </div>

        <div className="info-group">
          <label>Nhập lại mật khẩu mới:</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            className="input-field"
          />
        </div>

        <button className="edit-button" onClick={handleChangePassword}>
          Xác nhận thay đổi
        </button>
      </main>
    </div>
  );
};

export default ChangePWPage;
