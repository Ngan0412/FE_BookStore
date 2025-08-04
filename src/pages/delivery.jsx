import React, { useEffect, useState } from "react";
import styles from "../pages/delivery.module.css";
import { useNavigate } from "react-router-dom";
const OrderPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const Customer = JSON.parse(localStorage.getItem("user")) || [];
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `https://localhost:7221/api/UserOrders?customerId=${Customer.id}`
        );
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };

    fetchOrders();
  }, []);
  const getStatusCounts = (orders) => {
    const counts = {
      all: orders.length,
      shipping: 0,
      success: 0,
      canceled: 0,
    };

    orders.forEach((order) => {
      switch (order.status) {
        case "Đang vận chuyển":
          counts.shipping++;
          break;
        case "Thành công":
          counts.success++;
          break;
        default:
          counts.canceled++;
          break;
      }
    });

    return counts;
  };
  const counts = getStatusCounts(orders);

  const formatCurrency = (amount) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const getFilteredOrders = () => {
    switch (selectedTab) {
      case "shipping":
        return orders.filter((o) => o.status === "Đang vận chuyển");
      case "success":
        return orders.filter((o) => o.status === "Thành công");
      case "canceled":
        return orders.filter((o) => o.status === "Lỗi");
      default:
        return orders;
    }
  };

  const filteredOrders = getFilteredOrders();
  return (
    <div className={styles["account-container"]}>
      <aside className={styles["account-sidebar"]}>
        <h2>Tài khoản của tôi</h2>
        <ul>
          <li onClick={() => navigate("/profile")}>Thông tin tài khoản</li>
          <li className={styles["active"]}>Đơn hàng của tôi</li>
          <li onClick={() => navigate("/changePassword")}>Đổi mật khẩu</li>
        </ul>
      </aside>

      <div className={styles["orders-container"]}>
        <h1>Đơn hàng của tôi</h1>

        {/* Tabs */}
        <div className={styles["order-tabs"]}>
          <button
            className={`${styles["tab"]} ${
              selectedTab === "all" ? styles["active"] : ""
            }`}
            onClick={() => setSelectedTab("all")}
          >
            Tất cả ({counts.all})
          </button>
          <button
            className={`${styles["tab"]} ${
              selectedTab === "shipping" ? styles["active"] : ""
            }`}
            onClick={() => setSelectedTab("shipping")}
          >
            Vận Chuyển ({counts.shipping})
          </button>
          <button
            className={`${styles["tab"]} ${
              selectedTab === "success" ? styles["active"] : ""
            }`}
            onClick={() => setSelectedTab("success")}
          >
            Đã giao ({counts.success})
          </button>
          <button
            className={`${styles["tab"]} ${
              selectedTab === "canceled" ? styles["active"] : ""
            }`}
            onClick={() => setSelectedTab("canceled")}
          >
            Đã hủy ({counts.canceled})
          </button>
        </div>

        {/* Danh sách đơn hàng */}
        <div className={styles["order-list"]}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div className={styles["order-card"]} key={order.id}>
                <div className={styles["order-header"]}>
                  <span>
                    Mã đơn hàng: #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className={styles["order-status"]}>{order.status}</span>
                </div>

                <div className={styles["order-items"]}>
                  {order.bookList.map((book) => (
                    <div className={styles["order-item"]} key={book.id}>
                      <img
                        src={`https://localhost:7221/${book.image}`}
                        alt={`Ảnh bìa ${book.title}`}
                        width={80}
                        height={80}
                      />
                      <div className={styles["item-info"]}>
                        <h4>{book.title}</h4>
                        <p>Số lượng: {book.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles["order-footer"]}>
                  <span>
                    Tổng tiền:{" "}
                    <strong>{formatCurrency(order.totalAmount)}</strong>
                    <span style={{ marginLeft: "20px", color: "green" }}>
                      {order.paymentMethod}
                    </span>
                  </span>
                  <div className={styles["order-actions"]}>
                    <button className={styles["btn-outline"]}>
                      Liên hệ Shop
                    </button>
                    <button className={styles["btn-primary"]}>Đánh giá</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ width: "800px" }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
