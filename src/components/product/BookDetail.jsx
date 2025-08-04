import React, { useEffect, useState } from "react";
import "./BookDetailPage.css";
import { CartContext } from "../../contexts/CartContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import RelatedBooks from "../../components/product/BookRelated.jsx";

const BookDetailPage = () => {
  const { bookId } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Lấy chi tiết sách
    axios
      .get(`https://localhost:7221/api/UserBooks/${bookId}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy chi tiết sách:", err);
        setLoading(false);
      });

    // Lấy tất cả sách để lọc sách liên quan
    axios
      .get(`https://localhost:7221/api/UserBooks/GetRelated?bookId=${bookId}`)
      .then((res) => {
        setAllBooks(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách sách:", err);
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
  const handleSubscribe = async () => {
    const Customer = JSON.parse(localStorage.getItem("user"));

    if (!Customer || !Customer.id) {
      // Nếu chưa đăng nhập → chuyển tới trang đăng nhập
      navigate("/login");
      return;
    }
    // Nếu đã đăng nhập → cho nhập email
    const email = prompt("Nhập email của bạn để nhận khuyến mãi:");
    if (email) {
      try {
        const Customer = JSON.parse(localStorage.getItem("user")) || {};
        const response = await fetch(
          `https://localhost:7221/api/UserCustomers/${Customer.id}/get-promotion`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          }
        );

        if (response.ok) {
          alert("Đăng kí thành công!");
        } else {
          const error = await response.text();
          alert("Thất bại: " + error);
        }
      } catch (err) {
        console.error(err);
        alert("Lỗi khi gọi API");
      }
    }
  };
  if (loading) return <p style={{ padding: "20px" }}>Đang tải dữ liệu...</p>;
  if (!book) return <p style={{ padding: "20px" }}>Không tìm thấy sách!</p>;
  // Lọc sách liên quan
  const relatedBooks = allBooks
    .filter(
      (b) =>
        b.id !== book.id &&
        (b.category === book.category || b.author === book.author)
    )
    .slice(0, 5); // giới hạn 5 cuốn liên quan

  return (
    <div className="booklist">
      <div className="main-book">
        <div className="main-detail__item">
          {/* LEFT */}
          <div className="main-detail__item__left">
            <img
              src={`https://localhost:7221/${book.image}`}
              alt={book.title}
              className="book"
            />
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
              <a onClick={handleSubscribe}>Đăng ký nhận khuyến mãi</a>
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
                    {book.publisherName || "Đang cập nhật"}
                  </span>
                </p>
                <p>
                  Tác giả:{" "}
                  <span className="common-bold">
                    {book.authorName || "Đang cập nhật"}
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
                  <span className="label">Mã hàng:</span> {book.isbn}
                </div>
                <div className="info-row">
                  <span className="label">NXB:</span>{" "}
                  {book.publisherName || "Đang cập nhật"}
                </div>
                <div className="info-row">
                  <span className="label">Tác giả:</span>{" "}
                  {book.authorName || "Đang cập nhật"}
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
      <RelatedBooks relatedBooks={relatedBooks} />;
    </div>
  );
};

export default BookDetailPage;
