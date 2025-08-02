import React from "react";
import styles from "../pages/delivery.module.css";

const OrderPage = () => {
  return (
    <div className={styles["account-container"]}>
      <aside className={styles["account-sidebar"]}>
        <h2>Tài khoản của tôi</h2>
        <ul>
          <li className={styles["active"]}>Thông tin tài khoản</li>
          <li>Đơn hàng của tôi</li>
          <li>Đổi mật khẩu</li>
          <li>Đăng xuất</li>
        </ul>
      </aside>

      <div className={styles["orders-container"]}>
        <h1>Đơn hàng của tôi</h1>

        {/* Tabs */}
        <div className={styles["order-tabs"]}>
          <button className={styles["tab active"]}>Tất cả</button>
          <button className={styles["tab"]}>Chờ xác nhận</button>
          <button className={styles["tab"]}>Vận Chuyển</button>
          <button className={styles["tab"]}>Chờ Giao Hàng</button>
          <button className={styles["tab"]}>Đã giao</button>
          <button className={styles["tab"]}>Đã hủy</button>
        </div>

        {/* Order List */}
        <div className={styles["order-list"]}>
          {/* Order Card */}
          <div className={styles["order-card"]}>
            <div className={styles["order-header"]}>
              <span>Mã đơn hàng: #OD123456789</span>
              <span className={styles["order-status"]}>Đang giao</span>
            </div>

            <div className={styles["order-items"]}>
              <div className={styles["order-item"]}>
                <img src="https://via.placeholder.com/80" alt="Ảnh sách" />
                <div className={styles["item-info"]}>
                  <h4>Lập trình Web với React</h4>
                  <p>Số lượng: 1</p>
                  <p>Giá: 150.000₫</p>
                </div>
              </div>

              <div className={styles["order-item"]}>
                <img src="https://via.placeholder.com/80" alt="Ảnh sách" />
                <div className={styles["item-info"]}>
                  <h4>Node.js từ A đến Z</h4>
                  <p>Số lượng: 2</p>
                  <p>Giá: 240.000₫</p>
                </div>
              </div>
            </div>

            <div className={styles["order-footer"]}>
              <span>
                Tổng tiền: <strong>390.000₫</strong>
              </span>
              <div className={styles["order-actions"]}>
                <button className={styles["btn-outline"]}>Liên hệ Shop</button>
                <button className={styles["btn-primary"]}>Đánh giá</button>
              </div>
            </div>
          </div>

          {/* Thêm nhiều đơn hàng ở đây nếu cần */}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
