import React from "react";
import "./BookRelated.css"; // nếu bạn tách CSS riêng

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
    <div className="booklist">
      <div className="main-book">
        <div className="main-listBook__content">
          <div className="listBook__title">
            <div className="icon-book">
              <i className="fa-solid fa-book"></i>
            </div>
            <div className="title">SẢN PHẨM LIÊN QUAN</div>
          </div>
        </div>

        <div className="main-listBook__item">
          {relatedBooks.map((book, index) => (
            <div key={index} className="main-listBook__item__child">
              <img src={book.image} alt={book.title} className="listBook" />
              <div className="item__child__title">
                <div className="title__book">{book.title}</div>
                <div className="price__book">
                  <div className="price__book__new">
                    <p className="price">{book.priceNew}</p>
                    <p className="promotion">{book.promotion}</p>
                  </div>
                  <div className="price__book__old">
                    <p className="price">{book.priceOld}</p>
                  </div>
                  <p className="sold">đã bán {book.sold}</p>
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
