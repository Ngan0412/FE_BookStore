import React from "react";
import "../pages/AccountInfor.css"; // Đảm bảo đường dẫn đúng

const AccountInfoPage = () => {
  return (
    <div className="account-container">
      {/* Sidebar */}
      <aside className="account-sidebar">
        <h2>Tài khoản của tôi</h2>
        <ul>
          <li className="active">Thông tin tài khoản</li>
          <li>Đơn hàng của tôi</li>
          <li>Đổi mật khẩu</li>
          <li>Đăng xuất</li>
        </ul>
      </aside>

      {/* Content */}
      <main className="account-content">
        <h1>Thông tin tài khoản</h1>
        <div className="info-group">
          <label>Họ và tên:</label>
          <span>Nguyễn Văn A</span>
        </div>
        <div className="info-group">
          <label>Email:</label>
          <span>nguyenvana@gmail.com</span>
        </div>
        <div className="info-group">
          <label>Số điện thoại:</label>
          <span>0123456789</span>
        </div>
        <div className="info-group">
          <label>Địa chỉ:</label>
          <span>123 Đường Lê Lợi, Q.1, TP.HCM</span>
        </div>
        <button className="edit-button">Chỉnh sửa thông tin</button>
      </main>
    </div>
  );
};

export default AccountInfoPage;
