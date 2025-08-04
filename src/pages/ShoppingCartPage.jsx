import styles from "./ShoppingCartPage.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.jsx";

const ShoppingCartPage = () => {
  // State lưu số lượng sản phẩm, giả sử mặc định là 1
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true); // mặc định đã chọn tất cả
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const handleCheckout = () => {
    localStorage.setItem("promotion", JSON.stringify(activeVoucher));
    navigate("/checkout");
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  const handleSelectItem = (itemId) => {
    let updatedSelectedItems;
    if (selectedItems.includes(itemId)) {
      updatedSelectedItems = selectedItems.filter((id) => id !== itemId);
    } else {
      updatedSelectedItems = [...selectedItems, itemId];
    }

    setSelectedItems(updatedSelectedItems);

    // Cập nhật selectAll
    setSelectAll(updatedSelectedItems.length === cartItems.length);
  };
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(
          "https://localhost:7221/api/UserPromotions"
        );

        if (!response.ok) {
          throw new Error("Lỗi khi gọi API");
        }

        const data = await response.json();
        setVouchers(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu voucher:", error);
      }
    };
    fetchVouchers();
  }, []);

  // const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    // mỗi khi cartItems thay đổi thì chọn tất cả mặc định
    setSelectedItems(cartItems.map((item) => item.id));
  }, [cartItems]);

  const handleDecrease = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };
  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    const removedItem = updatedCart.splice(index, 1)[0];
    setCartItems(updatedCart);

    setSelectedItems(selectedItems.filter((id) => id !== removedItem.id));
  };
  useEffect(() => {
    setSelectAll(
      selectedItems.length === cartItems.length && cartItems.length > 0
    );
  }, [selectedItems, cartItems]);
  const totalPrice = cartItems.reduce((sum, item) => {
    if (selectedItems.includes(item.id)) {
      return sum + item.quantity * item.price;
    }
    return sum;
  }, 0);
  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart); // context sẽ lo lưu localStorage
  };
  const activeVoucher =
    appliedVoucher || vouchers.find((v) => totalPrice >= v.condition) || null;
  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price)) return "0 đ";
    return price.toLocaleString("vi-VN") + " đ";
  };
  const finalPrice = Math.max(
    totalPrice * (activeVoucher ? 1 - activeVoucher.discountPercent : 1),
    0
  );
  return (
    <main>
      {/* giỏ hàng */}
      <div className={styles.booklist}>
        <div className={styles["main-book"]}>
          <div className={styles["title-shoppingCart"]}>
            GIỎ HÀNG ({cartItems.length} sản phẩm)
          </div>
          <div className={styles["main-detail__item"]}>
            {/* item left */}
            <div className={styles["main-detail__item__left"]}>
              <div className={styles["item__left__top"]}>
                <label
                  className={`${styles["custom-checkbox"]} ${styles["row-grid"]}`}
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />

                  <span className={styles.checkmark}></span>

                  <p className={styles["text-shoppingCart"]}>
                    Chọn tất cả ({cartItems.length} sản phẩm)
                  </p>
                  <p className={styles["text-shoppingCart"]}>Số lượng</p>
                  <p className={styles["text-shoppingCart"]}>Thành tiền</p>
                </label>
              </div>
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles["item__left__bottom"]} ${styles["row-grid"]}`}
                >
                  <label className={styles["custom-checkbox"]}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />

                    <span className={styles.checkmark}></span>
                  </label>

                  <div className={styles["info-bookCart"]}>
                    <img
                      src={`https://localhost:7221/${item.image}`}
                      alt={item.title}
                      className={styles.book}
                    />
                    <div className={styles["title-bookCart"]}>
                      <div className={styles["title-book"]}>{item.title}</div>
                      <div className={styles.price__book}>
                        <div
                          className={`${styles.price__book__new} ${styles["color-new"]}`}
                        >
                          <p className={styles.price}>
                            {formatPrice(
                              activeVoucher
                                ? item.price *
                                    item.quantity *
                                    (1 - activeVoucher.discountPercent)
                                : item.price * item.quantity
                            )}
                          </p>
                        </div>
                        <div className={styles.price__book__old}>
                          <p className={styles.price}>
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles["quantity-wrapper"]}>
                    <button
                      className={styles["quantity-btn"]}
                      onClick={() => handleDecrease(index)}
                      type="button"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className={styles["quantity-input"]}
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className={styles["quantity-btn"]}
                      onClick={() => handleIncrease(index)}
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.price__book__new}>
                    <p className={styles.price}>
                      {formatPrice(
                        activeVoucher
                          ? item.price *
                              item.quantity *
                              (1 - activeVoucher.discountPercent)
                          : item.price * item.quantity
                      )}
                    </p>
                  </div>

                  <div className={styles["icon-delete"]}>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => handleDelete(index)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
            {/* item right */}
            <div className={styles["main-detail__item__right"]}>
              <div className={styles["main-detail__item__right__title"]}>
                <div className={styles.pay_discount}>
                  <p className={styles.right__title}>
                    <i className="fa-solid fa-percent"></i>Khuyến Mãi
                  </p>
                  <p
                    className={`${styles.right__title} ${styles["right__title-small"]}`}
                    onClick={() => setShowPromoPopup(true)}
                  >
                    Xem Thêm
                  </p>
                </div>

                <div className={styles["text-discount"]}>
                  {activeVoucher && (
                    <>
                      <p className={styles.voucherCode}>{activeVoucher.name}</p>
                      <p className={styles["text-discount__item"]}>
                        Mã giảm{" "}
                        {Math.round(activeVoucher.discountPercent * 100)}%
                      </p>
                      <p className={styles["text-discount__item"]}>
                        Đơn hàng từ {activeVoucher.condition.toLocaleString()}đ
                        áp dụng cho toàn bộ sản phẩm
                      </p>
                      <p className={styles["text-discount__item"]}>
                        HSD:{" "}
                        {new Date(activeVoucher.endDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </>
                  )}
                  <button
                    className={`${styles.btn} ${styles["text-discount__item"]}`}
                    onClick={() => navigate("/")}
                  >
                    Mua Thêm
                  </button>
                </div>
              </div>
              <div className={styles["main-pay"]}>
                <div className={`${styles["price-pay"]} ${styles.price}`}>
                  <p>Tổng tiền</p>
                  <strong>{formatPrice(totalPrice)}</strong>{" "}
                  {/* ✅ Sửa lại: dùng totalPrice */}
                </div>

                <div className={`${styles["price-pay"]} ${styles.price}`}>
                  <p>Giảm Giá ({activeVoucher.name} )</p>
                  <strong className={styles.colorPrice}>
                    {formatPrice(finalPrice - totalPrice)}
                  </strong>{" "}
                  {/* ✅ Giá sau khi áp dụng mã */}
                </div>

                <div className={`${styles["price-pay"]} ${styles.price}`}>
                  <p>Tiền phải trả</p>
                  <strong className={styles.colorPrice}>
                    {formatPrice(finalPrice)}
                  </strong>{" "}
                  {/* ✅ Giá sau khi áp dụng mã */}
                </div>

                <button
                  className={`${styles.btn} ${styles["btn-pay-color"]}`}
                  onClick={handleCheckout}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
        {showPromoPopup && (
          <div className={styles.overlay}>
            <div className={styles.voucherModal}>
              <div className={styles.voucherHeader}>
                <span>Khuyến mãi áp dụng</span>
                <button onClick={() => setShowPromoPopup(false)}>×</button>
              </div>

              <div className={styles.voucherList}>
                {vouchers.map((voucher) => {
                  const isApplied = appliedVoucher?.id === voucher.id;
                  const isEligible = totalPrice >= voucher.condition;

                  const formattedEnd = new Date(
                    voucher.endDate
                  ).toLocaleDateString("vi-VN");

                  return (
                    <div key={voucher.id} className={styles.voucherCard}>
                      <div className={styles.voucherLeft}>
                        <div className={styles.voucherCode}>{voucher.name}</div>
                        <div className={styles.voucherDesc}>
                          Đơn hàng từ{" "}
                          {voucher.condition.toLocaleString("vi-VN")} đ – Giảm (
                          {Math.round(voucher.discountPercent * 100)}%)
                        </div>
                        <div className={styles.voucherDate}>
                          HSD: {formattedEnd}
                        </div>
                      </div>
                      <div className={styles.voucherRight}>
                        {isApplied ? (
                          <button className={styles.applyBtn} disabled>
                            Đã áp dụng
                          </button>
                        ) : (
                          <button
                            className={styles.applyBtn}
                            disabled={!isEligible}
                            onClick={() => {
                              setAppliedVoucher(voucher);
                              setShowPromoPopup(false);
                            }}
                          >
                            Áp dụng
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShoppingCartPage;
