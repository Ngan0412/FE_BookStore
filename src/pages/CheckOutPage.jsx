import React, { useState, useEffect } from "react";

import "./CheckOutPage.css";

const CheckoutPage = () => {
  const [customer, setCustomer] = useState({
    id: "",
    familyName: "",
    givenName: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD"); // mặc định: thanh toán khi nhận hàng
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [promotion, setPromotions] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    const storedPromotion = JSON.parse(localStorage.getItem("promotion")) || [];
    const storedCustomer = JSON.parse(localStorage.getItem("user")) || {
      id: "",
      familyName: "",
      givenName: "",
      phone: "",
      address: "",
    };
    setCheckoutItems(storedItems);
    setPromotions(storedPromotion);
    setCustomer(storedCustomer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customer.givenName || !customer.familyName) {
      alert("Vui lòng nhập tên khách hàng.");
      return;
    }
    if (!customer.phone) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }

    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(customer.phone)) {
      alert(
        "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng Việt Nam."
      );
      return;
    }
    if (!customer.address) {
      alert("Vui lòng nhập địa chỉ.");
      return;
    }
    if (paymentMethod == "Momo") {
      try {
        const amount = checkoutItems.reduce(
          (sum, item) =>
            sum +
            item.quantity *
              item.price *
              (promotion ? 1 - promotion.discountPercent : 1),
          0
        );
        // const amount = 10000;
        const response = await fetch(
          `https://localhost:7221/api/UserOrders/pay/${amount}`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        if (data.payUrl) {
          // Redirect người dùng sang giao diện Momo
          window.open(data.payUrl, "_blank");
        } else {
          alert("Không nhận được URL thanh toán từ server.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API thanh toán:", error);
        alert("Gọi API thất bại");
      }
    }
    const orderPayload = {
      customerId: customer.id,
      address: customer.address,
      phone: customer.phone,
      familyName: customer.familyName,
      givenName: customer.givenName,
      promotionId: promotion?.id ?? null,
      paymentMethod: paymentMethod === "COD" ? "Tiền mặt" : "MoMo",
      items: checkoutItems.map((item) => ({
        bookId: item.id,
        quantity: item.quantity,
      })),
    };
    try {
      const res = await fetch("https://localhost:7221/api/UserOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error("Đặt hàng thất bại");
      alert("Đặt hàng thành công!");
      localStorage.removeItem("cart");
      localStorage.removeItem("promotion");
      window.location.href = "/delivery";
    } catch (err) {
      console.error("Lỗi khi gọi API thanh toán:", err);
      alert(`Đặt hàng thất bại ${err}. Vui lòng thử lại.`);
    }
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
            placeholder="Nhập Họ"
            name="givenName"
            value={customer.givenName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Nhập Tên"
            name="familyName"
            value={customer.familyName}
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
              value="Momo"
              checked={paymentMethod === "Momo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Ví điện tử Momo
          </label>
        </div>
      </section>

      {/* KIỂM TRA ĐƠN HÀNG */}
      <section className="section">
        <h2>3. Kiểm Tra Đơn Hàng</h2>
        <div className="order-summary">
          {checkoutItems.map((item) => (
            <div className="item" key={item.id}>
              <img
                src={`https://localhost:7221/${item.image}`}
                alt={item.title}
              />
              <div className="info">
                <p>{item.title}</p>
                <span>x{item.quantity}</span>
              </div>
              <strong>
                {(
                  item.price *
                  item.quantity *
                  (promotion ? 1 - promotion.discountPercent : 1)
                ).toLocaleString("vi-VN")}
                ₫
              </strong>
            </div>
          ))}
          <div className="total">
            <span>Tổng cộng:</span>
            <strong>
              {checkoutItems
                .reduce(
                  (sum, item) =>
                    sum +
                    item.quantity *
                      item.price *
                      (promotion ? 1 - promotion.discountPercent : 1),
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
