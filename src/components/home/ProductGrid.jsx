import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook } from "react-icons/fa";
import styles from "./ProductGrid.module.css";
import { Link } from "react-router-dom";
const formatPrice = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "decimal",
    currency: "VND",
    minimumFractionDigits: 0,
  });
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    axios
      .get("https://localhost:7221/api/UserBooks")
      .then((res) => {
        setBooks(res.data);
        setVisibleBooks(res.data.slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API: ", err);
        setLoading(false);
      });
  }, []);
  const handleShowMore = () => {
    setShowAll(true);
    setVisibleBooks(books);
  };
  if (loading) return <p style={{ padding: "20px" }}> Đang tải dữ liệu ...</p>;

  return (
    <div className={styles["booklist"]}>
      <div className={styles["main-book"]}>
        <div className={styles["main-listBook__content"]}>
          <div className={styles["listBook__title"]}>
            <div className={styles["icon-book"]}>
              <FaBook />
            </div>
            <div className={styles["title"]}>TẤT CẢ SẢN PHẨM</div>
          </div>

          {/* Navigation bar bị ẩn trong HTML gốc, có thể thêm sau */}
        </div>

        <div className={styles["main-listBook__item"]}>
          {visibleBooks.map((book, index) => (
            <Link
              to={`/book/${book.id}`}
              key={index}
              className={styles["main-listBook__item__child"]}
            >
              <img
                src={`https://localhost:7221/${book.image}`}
                alt={book.title}
                className={styles["listBook"]}
              />
              <div className={styles["item__child__title"]}>
                <div className={styles["title__book"]}>{book.title}</div>
                <div className={styles["price__book"]}>
                  <div className={styles["price__book__new"]}>
                    <p className={styles["price"]}>{formatPrice(book.price)}</p>

                    {/* <p className={styles["promotion"]}>20%</p> */}
                  </div>
                  <div className={styles["info-row"]}>
                    <span className={styles["label"]}>
                      <strong>Số Lượng : </strong>
                    </span>{" "}
                    {book.quantity || "Đang cập nhật"}
                  </div>
                  {/* <div className={styles["price__book__old"]}>
                    <p className={styles["price"]}>{formatPrice(book.price)}</p>
                  </div> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!showAll && (
          <button
            className={`${styles.btn} ${styles.btn__xemthem}`}
            onClick={handleShowMore}
          >
            Xem Thêm
          </button>
        )}
      </div>
    </div>
  );
};
export default BookList;
