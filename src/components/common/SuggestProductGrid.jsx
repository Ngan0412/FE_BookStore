import React, { useState, useEffect } from "react";
import styles from "./SuggestProductGrid.module.css";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "decimal",
    currency: "VND",
    minimumFractionDigits: 0,
  });
};
const BookSuggestions = () => {
  const [books, setBooks] = useState([]);
  const [bookIds, setBookIds] = useState(() =>
    JSON.parse(localStorage.getItem("bookIds") || "[]")
  );

  // Lắng nghe thay đổi localStorage (tab khác hoặc code gọi setItem)
  useEffect(() => {
    const handleStorageChange = () => {
      const ids = JSON.parse(localStorage.getItem("bookIds") || "[]");
      setBookIds(ids);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Chỉ gọi API khi bookIds thay đổi và đủ 3
  useEffect(() => {
    if (bookIds.length !== 3) return;

    const fetchSuggestions = async () => {
      try {
        const upperBookIds = bookIds.map((id) =>
          typeof id === "string" ? id.toUpperCase() : String(id).toUpperCase()
        );
        const response = await fetch("http://127.0.0.1:8000/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ book_ids: upperBookIds }),
        });

        if (!response.ok) throw new Error("Lỗi server!");
        const data = await response.json();
        setBooks(data.recommended_books || []);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchSuggestions();
  }, [bookIds]);

  return (
    <div className={styles["booklist"]}>
      <div className={styles["main-book"]}>
        <div className={styles["main-bookSuggestions__content"]}>
          <div className={styles["bookSuggestions__title"]}>
            <div className={styles["title-sugestion"]}>
              <span className={styles["star"]}>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </span>
              Gợi Ý Cho Bạn
              <span className={styles["star"]}>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </span>
            </div>
          </div>
        </div>

        <div className={styles["main-bookSuggestions__item"]}>
          {books.map((book, index) => (
            <Link
              to={`/book/${book.id}`}
              key={index}
              className={styles["main-bookSuggestions__item__child"]}
            >
              <img
                src={`http://localhost:5286/${book.image}`}
                alt={book.title}
                className={styles["listBook"]}
              />
              <div className={styles["item__child__title"]}>
                <div className={styles["title__book"]}>{book.title}</div>
                <div className={styles["price__book"]}>
                  <div className={styles["price__book__new"]}>
                    <p className={styles["price"]}>
                      {formatPrice(Number(book.price))}
                    </p>
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
