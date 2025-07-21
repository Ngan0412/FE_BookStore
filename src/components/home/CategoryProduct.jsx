import React, { useState, useEffect } from "react";
import "../home/CategoryProduct.css";
import axios from "axios";
import { FaTableCells } from "react-icons/fa6";

// const categories = [
//   { title: "Sách Ngoại Ngữ", img: "/styles/img/ngoaingu.webp" },
//   { title: "Sách Giáo Khoa", img: "/styles/img/tamly.webp" },
//   { title: "Sách Thiếu Nhi", img: "/styles/img/vanhoc.webp" },
//   { title: "Sách Tâm Lý", img: "/styles/img/tamly.webp" },
//   { title: "Sách Tâm Lý", img: "/styles/img/tamly.webp" },
//   { title: "Sách Tâm Lý", img: "/styles/img/tamly.webp" },
//   { title: "Sách Tâm Lý", img: "/styles/img/tamly.webp" },
//   { title: "Sách Tâm Lý", img: "/styles/img/tamly.webp" },
//   { title: "Sách Văn Học", img: "/styles/img/vanhoc.webp" },
//   { title: "Sách Văn Học", img: "/styles/img/vanhoc.webp" },
// ];
const getCategoryImage = (name) => {
  switch (name) {
    case "Truyện tranh":
      return "/styles/img/ngoaingu.webp";
    case "Tiểu thuyết":
      return "/styles/img/vanhoc.webp";
    case "Tâm lý học":
      return "/styles/img/tamly.webp";
    case "Giáo dục":
      return "/styles/img/vanhoc.webp";
    case "Khoa học":
      return "/styles/img/vanhoc.webp";
    default:
      return "/styles/img/vanhoc.webp"; // ảnh mặc định
  }
};

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://localhost:7226/api/Category")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
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
        `https://localhost:7226/api/Book/GetByCategory?categoryId=${category.id}`
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
      <div className="image-banner">
        <img src="/styles/img/banner.webp" alt="Khuyến mãi sách" />
      </div>
      {/*  danh mục sản phẩm */}
      <div className="main-category">
        <div className="main-category__content">
          <div className="main-category__title">
            <div className="icon-child">
              <FaTableCells />
            </div>
            <div className="title">Danh Mục Sản Phẩm</div>
          </div>

          <div className="main-category__item">
            {categories.map((cat) => (
              <div
                className="main-category__itemChild"
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={getCategoryImage(cat.name)}
                  alt={cat.name}
                  className="book"
                />
                <div className="title-book">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedCategory && (
        <div className="listbook">
          <div className="main-listBook">
            <div className="main-listBook__content">
              <div className="listBook__title">
                <div className="icon-book">📚</div>
                Sách thuộc thể loại:{" "}
                <b style={{ marginLeft: "5px" }}>{selectedCategory}</b>
              </div>
              <div className="main-listBook__item">
                {books.length > 0 ? (
                  books.map((book) => (
                    <div key={book.id} className="main-listBook__item__child">
                      <img
                        src={book.image || "/styles/img/default_book.webp"}
                        alt={book.title}
                        style={{
                          width: "80%",
                          height: "180px",
                          objectFit: "cover",
                          marginTop: "10px",
                        }}
                      />
                      <p className="item__child__title">{book.title}</p>
                      <p className="price__book__new">{book.price}₫</p>
                    </div>
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
