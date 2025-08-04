import React, { useState, useEffect } from "react";
import "../pages/AccountInfor.css"; // Đảm bảo đường dẫn đúng
import { useNavigate } from "react-router-dom";
const AccountInfoPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const Customer = JSON.parse(localStorage.getItem("user")) || {};
    setUserInfo(Customer);
  }, []);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(
        `https://localhost:7221/api/UserCustomers/${userInfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo), // ⚠️ Không bọc thêm { userInfo }
        }
      );

      if (response.ok) {
        alert("Cập nhật thông tin thành công!");
        // Cập nhật lại localStorage nếu cần
        localStorage.setItem("user", JSON.stringify(userInfo));
      } else {
        const errorData = await response.json();
        console.error("Lỗi:", errorData);
        alert("Cập nhật thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi kết nối đến server.");
    }
  };
  return (
    <div className="account-container">
      {/* Sidebar */}
      <aside className="account-sidebar">
        <h2>Tài khoản của tôi</h2>
        <ul>
          <li className="active">Thông tin tài khoản</li>
          <li onClick={() => navigate("/delivery")}>Đơn hàng của tôi</li>
          <li onClick={() => navigate("/changePassword")}>Đổi mật khẩu</li>
        </ul>
      </aside>

      {/* Content */}
      <main className="account-content">
        <h1>Thông tin tài khoản</h1>

        <div className="info-group">
          <label>Họ và tên:</label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={`${userInfo.familyName} ${userInfo.givenName}`}
              onChange={(e) => {
                const [family, ...given] = e.target.value.split(" ");
                setUserInfo((prev) => ({
                  ...prev,
                  familyName: family,
                  givenName: given.join(" "),
                }));
              }}
            />
          ) : (
            <span>{`${userInfo.familyName} ${userInfo.givenName}`}</span>
          )}
        </div>

        {/* <div className="info-group">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
            />
          ) : (
            <span>{userInfo.email || "Chưa cung cấp"}</span>
          )}
        </div> */}

        <div className="info-group">
          <label>Số điện thoại:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
            />
          ) : (
            <span>{userInfo.phone}</span>
          )}
        </div>

        <div className="info-group">
          <label>Ngày sinh:</label>
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={userInfo.dateOfBirth}
              onChange={handleChange}
            />
          ) : (
            <span>
              {new Date(userInfo.dateOfBirth).toLocaleDateString("vi-VN")}
            </span>
          )}
        </div>

        <div className="info-group">
          <label>Giới tính:</label>
          {isEditing ? (
            <select
              name="gender"
              value={userInfo.gender ? "female" : "male"}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  gender: e.target.value === "female",
                }))
              }
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          ) : (
            <span>{userInfo.gender ? "Nữ" : "Nam"}</span>
          )}
        </div>

        <div className="info-group">
          <label>Địa chỉ:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
            />
          ) : (
            <span>{userInfo.address}</span>
          )}
        </div>

        {isEditing ? (
          <button className="edit-button" onClick={handleSave}>
            Lưu
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Chỉnh sửa thông tin
          </button>
        )}
      </main>
    </div>
  );
};

export default AccountInfoPage;
