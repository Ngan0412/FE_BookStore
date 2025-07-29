import React, { useState } from "react";
import styles from "./ShoppingCartPage.module.css";

const ShoppingCartPage = () => {
  // State lưu số lượng sản phẩm, giả sử mặc định là 1
  const [quantity, setQuantity] = useState(1);

  // Giá sản phẩm (giá mới)
  const unitPrice = 188000;

  // Hàm tăng số lượng
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  // Hàm giảm số lượng (tối thiểu là 1)
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Tính thành tiền theo số lượng
  const totalPrice = unitPrice * quantity;

  // Hàm format số thành dạng "xxx.xxx đ"
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  return (
    <main>
      {/* giỏ hàng */}
      <div className={styles.booklist}>
        <div className={styles["main-book"]}>
          <div className={styles["title-shoppingCart"]}>
            GIỎ HÀNG ({quantity} sản phẩm )
          </div>
          <div className={styles["main-detail__item"]}>
            {/* item left */}
            <div className={styles["main-detail__item__left"]}>
              <div className={styles["item__left__top"]}>
                <label
                  className={`${styles["custom-checkbox"]} ${styles["row-grid"]}`}
                >
                  <input type="checkbox" defaultChecked />
                  <span className={styles.checkmark}></span>

                  <p className={styles["text-shoppingCart"]}>
                    Chọn tất cả ({quantity} sản phẩm)
                  </p>
                  <p className={styles["text-shoppingCart"]}>Số lượng</p>
                  <p className={styles["text-shoppingCart"]}>Thành tiền</p>
                </label>
              </div>
              <div
                className={`${styles["item__left__bottom"]} ${styles["row-grid"]}`}
              >
                <label className={styles["custom-checkbox"]}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.checkmark}></span>
                </label>

                <div className={styles["info-bookCart"]}>
                  <img
                    src="../../styles/img/9786043775662.webp"
                    alt=""
                    className={styles.book}
                  />
                  <div className={styles["title-bookCart"]}>
                    <div className={styles["title-book"]}>
                      Giáo Trình Chuẩn HSK 1 (Tái Bản 2023)
                    </div>
                    <div className={styles.price__book}>
                      <div
                        className={`${styles.price__book__new} ${styles["color-new"]}`}
                      >
                        <p className={styles.price}>{formatPrice(unitPrice)}</p>
                      </div>
                      <div className={styles.price__book__old}>
                        <p className={styles.price}>198.000 đ</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles["quantity-wrapper"]}>
                  <button
                    className={styles["quantity-btn"]}
                    onClick={handleDecrease}
                    type="button"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className={styles["quantity-input"]}
                    value={quantity}
                    readOnly
                  />
                  <button
                    className={styles["quantity-btn"]}
                    onClick={handleIncrease}
                    type="button"
                  >
                    +
                  </button>
                </div>

                <div className={styles.price__book__new}>
                  <p className={styles.price}>{formatPrice(totalPrice)}</p>
                </div>

                <div className={styles["icon-delete"]}>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
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
