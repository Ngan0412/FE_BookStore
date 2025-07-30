import React, { useEffect, useState } from "react";
import "./BookDetailPage.css";
import { CartContext } from "../../contexts/CartContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

const BookDetailPage = () => {
  const { bookId } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`https://localhost:7226/api/Book/${bookId}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy chi tiết sách:", err);
        setLoading(false);
      });
  }, [bookId]);

  const { addToCart } = useContext(CartContext); // lấy hàm

  const handleAddToCart = () => {
    addToCart(book); // dùng context để thêm
    alert("Đã thêm vào giỏ hàng!");
  };
  const handleBuyNow = () => {
    handleAddToCart(); // Thêm vào giỏ hàng trước
    navigate("/cart");
    window.scrollTo(0, 0);
  };

  if (loading) return <p style={{ padding: "20px" }}>Đang tải dữ liệu...</p>;
  if (!book) return <p style={{ padding: "20px" }}>Không tìm thấy sách!</p>;

  return (
    <div className="booklist">
      <div className="main-book">
        <div className="main-detail__item">
          {/* LEFT */}
          <div className="main-detail__item__left">
            <img src={book.image} alt={book.title} className="book" />
            <div className="btn-detail">
              <button className="btn btn__themvaogio" onClick={handleAddToCart}>
                <div className="icon icon__giohang">
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
                Thêm Vào Giỏ Hàng
              </button>
              <button className="btn btn__muangay" onClick={handleBuyNow}>
                Mua Ngay
              </button>
            </div>
            <div className="detail__title">
              <p className="title">Chính sách ưu đãi</p>
              <p>Giao hàng nhanh, đổi trả miễn phí, giá tốt cho khách sỉ.</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="main-detail__item__right">
            <div className="main-detail__item__right__title">
              <p className="right__title">{book.title}</p>
              <div className="common">
                <p>
                  Nhà xuất bản:{" "}
                  <span className="common-bold">
                    {book.publisher || "Đang cập nhật"}
                  </span>
                </p>
                <p>
                  Tác giả:{" "}
                  <span className="common-bold">
                    {book.author || "Đang cập nhật"}
                  </span>
                </p>
              </div>
              <div className="price__book__new">
                <p className="price price__book">
                  {(book.price * 0.8).toLocaleString()} đ
                </p>
                <p className="price__book__old">
                  {book.price.toLocaleString()} đ
                </p>
                <p className="promotion promotion__book">20%</p>
              </div>
            </div>

            <div className="main-detail__item__right__detail">
              <div className="product-info">
                <h2>Thông tin chi tiết</h2>
                <div className="info-row">
                  <span className="label">Mã hàng:</span> {book.id}
                </div>
                <div className="info-row">
                  <span className="label">NXB:</span>{" "}
                  {book.publisher || "Đang cập nhật"}
                </div>
                <div className="info-row">
                  <span className="label">Tác giả:</span>{" "}
                  {book.author || "Đang cập nhật"}
                </div>
              </div>
            </div>

            <div className="main-detail__item__right__desc">
              <div className="container">
                <h2 className="section-title">Mô tả sản phẩm</h2>
                <p className="intro">
                  {book.description || "Đang cập nhật..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
