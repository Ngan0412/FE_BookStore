import React, { useState, useEffect } from "react";

import "./CheckOutPage.css";

const CheckoutPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD"); // mặc định: thanh toán khi nhận hàng
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const storedItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    setCheckoutItems(storedItems);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert(
      "Đặt hàng thành công!\n" +
        `Tên: ${customer.name}\n` +
        `SĐT: ${customer.phone}\n` +
        `Địa chỉ: ${customer.address}\n` +
        `Phương thức: ${paymentMethod}`
    );
  };

  return (
    <div className="checkout-container">
      <h1>Thanh Toán</h1>

      {/* THÔNG TIN KHÁCH HÀNG */}
      <section className="section">
        <h2>1. Thông Tin Khách Hàng</h2>
        <form className="customer-info">
          <input
            type="text"
            placeholder="Họ và tên"
            name="name"
            value={customer.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            name="phone"
            value={customer.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Địa chỉ nhận hàng"
            name="address"
            value={customer.address}
            onChange={handleInputChange}
            required
          />
        </form>
      </section>

      {/* PHƯƠNG THỨC THANH TOÁN */}
      <section className="section">
        <h2>2. Phương Thức Thanh Toán</h2>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Thanh toán khi nhận hàng
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="ShopeePay"
              checked={paymentMethod === "ShopeePay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Ví điện tử ShopeePay
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Bank"
              checked={paymentMethod === "Bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Thẻ ngân hàng nội địa
          </label>
        </div>
      </section>

      {/* KIỂM TRA ĐƠN HÀNG */}
      <section className="section">
        <h2>3. Kiểm Tra Đơn Hàng</h2>
        <div className="order-summary">
          {checkoutItems.map((item) => (
            <div className="item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="info">
                <p>{item.title}</p>
                <span>x{item.quantity}</span>
              </div>
              <strong>
                {(item.price * 0.8 * item.quantity).toLocaleString("vi-VN")}₫
              </strong>
            </div>
          ))}
          <div className="total">
            <span>Tổng cộng:</span>
            <strong>
              {checkoutItems
                .reduce(
                  (sum, item) => sum + item.quantity * item.price * 0.8,
                  0
                )
                .toLocaleString("vi-VN")}
              ₫
            </strong>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Đặt hàng
          </button>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
