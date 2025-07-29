import styles from "./ShoppingCartPage.module.css";
import React, { useState, useEffect } from "react";

const ShoppingCartPage = () => {
  // State lưu số lượng sản phẩm, giả sử mặc định là 1
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true); // mặc định đã chọn tất cả

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

  const totalPrice = cartItems.reduce((sum, item) => {
    if (selectedItems.includes(item.id)) {
      return sum + item.quantity * item.price * 0.8;
    }
    return sum;
  }, 0);

  // const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setSelectedItems(storedCart.map((item) => item.id)); // chọn tất cả mặc định
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + " đ";
  };
  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrease = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    const removedItem = updatedCart.splice(index, 1)[0];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSelectedItems(selectedItems.filter((id) => id !== removedItem.id));
  };
  useEffect(() => {
    setSelectAll(
      selectedItems.length === cartItems.length && cartItems.length > 0
    );
  }, [selectedItems, cartItems]);

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
                      src={item.image}
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
                            {formatPrice(item.price * 0.8)}
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
                      {formatPrice(item.price * 0.8 * item.quantity)}
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
                  >
                    Xem Thêm
                  </p>
                </div>

                <div className={styles["text-discount"]}>
                  <p className={styles["text-discount__item"]}>
                    Mã giảm giá 10K cho đơn hàng từ 130K
                  </p>
                  <p className={styles["text-discount__item"]}>
                    Đơn hàng từ 249k áp dụng cho đơn hàng KHÔNG bao gồm giá trị
                    của các sản phẩm Ngoại Văn, Manga, Phiếu Quà Tặng, Sách Giáo
                    Khoa
                  </p>
                  <p className={styles["text-discount__item"]}>
                    HSD: 31/07/2025
                  </p>
                  <button
                    className={`${styles.btn} ${styles["text-discount__item"]}`}
                  >
                    Mua Thêm
                  </button>
                </div>
              </div>
              <div className={styles["main-pay"]}>
                <div className={`${styles["price-pay"]} ${styles.price}`}>
                  <p>Thành Tiền</p>
                  <strong>{formatPrice(totalPrice)}</strong>
                </div>
                <div className={`${styles["price-pay"]} ${styles.price}`}>
                  <p>Tổng số tiền (gồm VAT)</p>
                  <strong>{formatPrice(totalPrice)}</strong>
                </div>
                <button className={`${styles.btn} ${styles["btn-pay-color"]}`}>
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCartPage;
