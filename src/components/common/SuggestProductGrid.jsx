import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SuggestProductGrid.css"; // bạn có thể tạo file CSS tương ứng

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://localhost:7226/api/Book/getAll")
      .then((res) => {
        setBooks(res.data.slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API: ", err);
        setLoading(false);
      });
  }, []);
  if (loading) return <p style={{ padding: "20px" }}> Đang tải dữ liệu ...</p>;
  return (
    <div className="listbook">
      <div className="main-listBook">
        <div className="main-bookSuggestions__content">
          <div className="bookSuggestions__title">
            <div className="title-sugestion">
              <span className="star">
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </span>
              Gợi Ý Cho Bạn
              <span className="star">
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </span>
            </div>
          </div>
          <div className="main-bookSuggestions__nav"></div>
        </div>

        <div className="main-bookSuggestions__item">
          {books.map((book, index) => (
            <div className="main-bookSuggestions__item__child" key={index}>
              <img
                src={book.image || "/styles/img/tamly.webp"}
                alt={book.title}
                className="listBook"
              />
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
                  <p className="sold">{book.sold}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
