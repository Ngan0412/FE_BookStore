import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook } from "react-icons/fa";
import "./ProductGrid.css";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    axios
      .get("https://localhost:7226/api/Book/getAll")
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
    <div className="booklist">
      <div className="main-book">
        <div className="main-listBook__content">
          <div className="listBook__title">
            <div className="icon-book">
              <FaBook />
            </div>
            <div className="title">TẤT CẢ SẢN PHẨM</div>
          </div>

          {/* Navigation bar bị ẩn trong HTML gốc, có thể thêm sau */}
        </div>

        <div className="main-listBook__item">
          {visibleBooks.map((book, index) => (
            <Link
              to={`/book/${book.id}`}
              key={index}
              className="main-listBook__item__child"
            >
              <img src={book.image} alt={book.title} className="listBook" />
              <div className="item__child__title">
                <div className="title__book">{book.title}</div>
                <div className="price__book">
                  <div className="price__book__new">
                    <p className="price">{(book.price * 80) / 100}</p>
                    <p className="promotion">20%</p>
                  </div>
                  <div className="price__book__old">
                    <p className="price">{book.price}</p>
                  </div>
                  <p className="sold">{book.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!showAll && (
          <button className="btn btn__xemthem" onClick={handleShowMore}>
            Xem Thêm
          </button>
        )}
      </div>
    </div>
  );
};
export default BookList;
