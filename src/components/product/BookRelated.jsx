import React from "react";
import styles from "./BookRelated.module.css";
import { Link } from "react-router-dom";

const RelatedBooks = ({ relatedBooks }) => {
  if (!relatedBooks || relatedBooks.length === 0) return null;

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
            <Link
              to={`/book/${book.id}`}
              key={index}
              className={styles["main-listBook__item__child"]}
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
                    <p className={styles["price"]}>
                      {(book.price * 0.8).toLocaleString()} đ
                    </p>
                    <p className={styles["promotion"]}>20%</p>
                  </div>
                  <div className={styles["price__book__old"]}>
                    <p className={styles["price"]}>
                      {book.price.toLocaleString()} đ
                    </p>
                  </div>
                  <p className={styles["sold"]}>Đã bán {book.sold || 0}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedBooks;
