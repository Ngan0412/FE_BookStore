import React, { useState, useEffect } from "react";
import styles from "./SuggestProductGrid.module.css"; // bạn có thể tạo file CSS tương ứng
import { Link } from "react-router-dom";

const BookSuggestions = ({ productsChatBot }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (Array.isArray(productsChatBot)) {
      setBooks(productsChatBot.slice(0, 10));
    }
  }, [productsChatBot]); // ✅ chỉ gọi khi productsChatBot thay đổi

  if (!books.length) return null;

  return (
    <div className={styles["booklist"]}>
      <div className={styles["main-book"]}>
        <div className={styles["main-bookSuggestions__content "]}>
          <div className={styles["bookSuggestions__title"]}>
            <div className={styles["title-sugestion"]}>
              <span className={styles["star"]}>
                <i className={styles["fa-regular fa-star"]}></i>
                <i className={styles["fa-regular fa-star"]}></i>
              </span>
              Gợi Ý Cho Bạn
              <span className={styles["star"]}>
                <i className={styles["fa-regular fa-star"]}></i>
                <i className={styles["fa-regular fa-star"]}></i>
              </span>
            </div>
          </div>
          <div className={styles["main-bookSuggestions__nav"]}></div>
        </div>

        <div className={styles["main-bookSuggestions__item"]}>
          {books.map((book, index) => (
            <Link
              to={`/book/${book.id}`}
              key={index}
              className={styles["main-bookSuggestions__item__child"]}
            >
              <img
                src={book.image}
                alt={book.title}
                className={styles["listBook"]}
              />
              <div className={styles["item__child__title"]}>
                <div className={styles["title__book"]}>{book.title}</div>
                <div className={styles["price__book"]}>
                  <div className={styles["price__book__new"]}>
                    <p className={styles["price"]}>{(book.price * 80) / 100}</p>
                    <p className={styles["promotion"]}>20%</p>
                  </div>
                  <div className={styles["price__book__old"]}>
                    <p className={styles["price"]}>{book.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSuggestions;
