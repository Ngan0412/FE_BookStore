import React from "react";
import styles from "./BookRelated.module.css"; // nếu bạn tách CSS riêng

const relatedBooks = [
  {
    title: "Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)",
    priceNew: "188.000 đ",
    priceOld: "198.000 đ",
    sold: "1.8k",
    promotion: "20%",
    image: "/styles/img/tamly.webp",
  },
  {
    title: "Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)",
    priceNew: "188.000 đ",
    priceOld: "198.000 đ",
    sold: "1.8k",
    promotion: "20%",
    image: "/styles/img/tamly.webp",
  },
  {
    title: "Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)",
    priceNew: "188.000 đ",
    priceOld: "198.000 đ",
    sold: "1.8k",
    promotion: "20%",
    image: "/styles/img/9786045893104_1_1.webp",
  },
  {
    title: "Giáo Trình Chuẩn HSK 1 (Tái Bản 2023)",
    priceNew: "188.000 đ",
    priceOld: "198.000 đ",
    sold: "1.8k",
    promotion: "20%",
    image: "/styles/img/9786043775662.webp",
  },
  {
    title: "Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)",
    priceNew: "188.000 đ",
    priceOld: "198.000 đ",
    sold: "1.8k",
    promotion: "20%",
    image: "/styles/img/tamly.webp",
  },
];

const RelatedBooks = () => {
  return (
    <div className={styles["booklist"]}>
      <div className={styles["main-book"]}>
        <div className={styles["main-listBook__content"]}>
          <div className={styles["listBook__title"]}>
            <div className={styles["icon-book"]}>
              <i className="fa-solid fa-book"></i>
            </div>
            <div className={styles["title"]}>SẢN PHẨM LIÊN QUAN</div>
          </div>
        </div>

        <div className={styles["main-listBook__item"]}>
          {relatedBooks.map((book, index) => (
            <div key={index} className={styles["main-listBook__item__child"]}>
              <img
                src={book.image}
                alt={book.title}
                className={styles["listBook"]}
              />
              <div className={styles["item__child__title"]}>
                <div className={styles["title__book"]}>{book.title}</div>
                <div className={styles["price__book"]}>
                  <div className={styles["price__book__new"]}>
                    <p className={styles["price"]}>{book.priceNew}</p>
                    <p className={styles["promotion"]}>{book.promotion}</p>
                  </div>
                  <div className={styles["price__book__old"]}>
                    <p className={styles["price"]}>{book.priceOld}</p>
                  </div>
                  <p className={styles["sold"]}>đã bán {book.sold}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedBooks;
