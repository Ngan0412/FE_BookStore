import React, { useState, useEffect } from "react";
import styles from "./CategoryProduct.module.css";
import axios from "axios";
import { FaTableCells } from "react-icons/fa6";
import { Link } from "react-router-dom";

const getCategoryImage = (name) => {
  switch (name) {
    case "Văn Học":
      return "/styles/img/vanhoc.webp";
    case "Sách Kinh Doanh":
      return "/styles/img/kinhdoanh.jpg";
    case "Sách Nấu Ăn":
      return "/styles/img/nau_an.webp";
    case "Sách Lịch Sử":
      return "/styles/img/lichsu.webp";
    case "Tiểu Thuyết":
      return "/styles/img/tieuthuyet.jpg";
    case "Truyện cổ tích":
      return "/styles/img/cotich.webp";
    case "Truyện Tranh":
      return "/styles/img/truyentranh.webp";
    case "Hài Hước":
      return "/styles/img/haihuoc.webp";
    case "Sách Làm Đẹp":
      return "/styles/img/lamdep.webp";

    default:
      return null; // không hiển thị nếu không khớp
  }
};

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5286/api/UserCategories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
        if (res.data.length > 0) {
          // Mặc định chọn danh mục đầu tiên
          handleCategoryClick(res.data[1]);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi gọi api thể loại ", err);
        setLoading(false);
      });
  }, []);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    axios
      .get(
        `http://localhost:5286/api/UserBooks/GetByCategory?categoryId=${category.id}`
      )
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy sách theo thể loại: ", err);
      });
  };
  if (loading) return <p style={{ padding: "20px" }}> ĐANG TẢI DANH MỤC ...</p>;
  return (
    <>
      {/* banner */}
      <div className={styles.imageBanner}>
        <img src="/styles/img/banner.webp" alt="Khuyến mãi sách" />
      </div>
      {/*  danh mục sản phẩm */}
      <div className={styles.booklist}>
        <div className={styles["main-book"]}>
          <div className={styles["main-category__title"]}>
            <div className={styles["icon-child"]}>
              <FaTableCells />
            </div>
            <div className={styles["title"]}>Danh Mục Sản Phẩm</div>
          </div>

          <div className={styles["main-category__item"]}>
            {categories.map((cat) => (
              <div
                className={styles["main-category__itemChild"]}
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  cursor: "pointer",
                  border:
                    selectedCategory === cat.name
                      ? "2px solid #007bff"
                      : "none",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={getCategoryImage(cat.name)}
                  alt={cat.name}
                  className={styles["book"]}
                />
                <div className={styles["title-book"]}>{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedCategory && (
        <div className={styles["booklist"]}>
          <div className={styles["main-book"]}>
            <div className={styles["main-listBook__content"]}>
              <div className={styles["listBook__title"]}>
                <div className={styles["icon-book"]}>📚</div>
                Sách thuộc thể loại:{" "}
                <b style={{ marginLeft: "5px" }}>{selectedCategory}</b>
              </div>
              <div className={styles["main-listBook__item"]}>
                {books.length > 0 ? (
                  books.map((book) => (
                    <Link
                      key={book.id}
                      to={`/book/${book.id}`}
                      className={styles["main-listBook__item__child"]}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={
                          book.image
                            ? `http://localhost:5286/${book.image}`
                            : "/styles/img/default_book.webp"
                        }
                        alt={book.title}
                        className={styles["listBook"]}
                        style={{
                          width: "150px",
                          height: "180px",
                          objectFit: "cover",
                          marginTop: "10px",
                        }}
                      />
                      <p className={styles["item__child__title"]}>
                        {book.title}
                      </p>
                      <p className={styles["price__book__new"]}>
                        {book.price}₫
                      </p>
                      <div className={styles["info-row"]}>
                        <span className={styles["label"]}>
                          <strong>Số Lượng : </strong>
                        </span>{" "}
                        {book.quantity || "Đang cập nhật"}
                      </div>
                      {/* <p className={styles["price__book__old"]}>
                        {book.price}₫
                      </p> */}
                    </Link>
                  ))
                ) : (
                  <p style={{ padding: "20px" }}>
                    Không có sách trong thể loại này.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategorySection;
