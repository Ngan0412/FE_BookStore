import React from "react";
import "./BookDetailPage.css"; // Giả sử bạn đã tách style riêng
import { useNavigate } from "react-router-dom";

const BookDetailPage = () => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/cart");
    window.scrollTo(0, 0);
  };
  return (
    <div className="booklist">
      <div className="main-book">
        <div className="main-detail__item">
          {/* Item Left */}
          <div className="main-detail__item__left">
            <img
              src="/styles/img/9786043775662.webp"
              alt="Book"
              className="book"
            />

            <div className="btn-detail">
              <button className="btn btn__themvaogio">
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
              <p className="title">Chính sách ưu đãi của Fahasa</p>
              <p>Thời gian giao hàng: Giao nhanh và uy tín</p>
              <p>Chính sách đổi trả: Đổi trả miễn phí toàn quốc</p>
              <p>Chính sách khách sỉ: Ưu đãi khi mua số lượng lớn</p>
            </div>
          </div>

          {/* Item Right */}
          <div className="main-detail__item__right">
            <div className="main-detail__item__right__title">
              <p className="right__title">
                Giáo Trình Chuẩn HSK 1 (Tái Bản 2023)
              </p>
              <div className="common">
                <p>
                  Nhà xuất bản:
                  <span className="common-bold">
                    Tổng Hợp Thành Phố Hồ Chí Minh
                  </span>
                </p>
                <p>
                  Tác giả:
                  <span className="common-bold">Khương Lệ Bình</span>
                </p>
              </div>
              <div className="common">
                <p>
                  Hình thức bìa:
                  <span className="common-bold">Bìa Mềm</span>
                </p>
              </div>

              <div className="common">
                <p className="star">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                  <span className="text_value">(0 đánh giá)</span>
                </p>
                <p className="daban">
                  <span className="luotBan">Đã bán</span>
                  <span className="luotBan">8.8k</span>
                </p>
              </div>

              <div className="price__book__new">
                <p className="price price__book">188.000 đ</p>
                <p className="price__book__old">198.000 đ</p>
                <p className="promotion promotion__book">20%</p>
              </div>
            </div>

            <div className="main-detail__item__right__transport"></div>

            <div className="main-detail__item__right__detail">
              <div className="product-info">
                <h2>Thông tin chi tiết</h2>
                <div className="info-row">
                  <span className="label">Mã hàng:</span> 9786043775662
                </div>
                <div className="info-row">
                  <span className="label">Nhà Cung Cấp:</span>{" "}
                  <a href="#">Cty Nhân Trí Việt</a>
                </div>
                <div className="info-row">
                  <span className="label">Tác giả:</span> Khương Lệ Bình, Vương
                  Phương, Vương Phong, Lưu Lệ Bình
                </div>
                <div className="info-row">
                  <span className="label">Người Dịch:</span> TS Nguyễn Thị Minh
                  Hồng
                </div>
                <div className="info-row">
                  <span className="label">NXB:</span> Tổng Hợp Thành Phố Hồ Chí
                  Minh
                </div>
                <div className="info-row">
                  <span className="label">Năm XB:</span> 2023
                </div>
                <div className="info-row">
                  <span className="label">Trọng lượng (gr):</span> 345
                </div>
                <div className="info-row">
                  <span className="label">Kích Thước Bao Bì:</span> 28.5 x 21 x
                  1 cm
                </div>
                <div className="info-row">
                  <span className="label">Số trang:</span> 141
                </div>
                <div className="info-row">
                  <span className="label">Hình thức:</span> Bìa Mềm
                </div>
                <div className="info-row">
                  Giá sản phẩm trên NPBookStore.com đã bao gồm thuế theo luật
                  hiện hành...
                </div>
              </div>
            </div>

            <div className="main-detail__item__right__desc">
              <div className="container">
                <h2 className="section-title">Mô tả sản phẩm</h2>
                <h1 className="main-title">
                  Giáo Trình Chuẩn HSK 1: Cuốn Sách Toàn Diện Cho Người Học
                  Tiếng Trung
                </h1>
                <p className="intro">
                  Bộ <strong>Giáo trình chuẩn HSK</strong>...{" "}
                  {/* rút gọn lại */}
                </p>

                <div className="feature">
                  <h3>1. Kết Hợp Toàn Diện Giữa Giảng Dạy và Luyện Thi</h3>
                  <p>
                    Giáo trình chuẩn HSK được biên soạn một cách tỉ mỉ, bám sát{" "}
                    <strong>nội dung, cấu trúc...</strong>
                  </p>
                </div>

                <div className="feature">
                  <h3>2. Bố Cục Khoa Học và Lộ Trình Học Tập Rõ Ràng</h3>
                  <p>
                    Mỗi cấp độ của giáo trình đều được sắp xếp theo một{" "}
                    <strong>bố cục chặt chẽ và khoa học</strong>. Các kiến thức
                    về
                    <strong>ngữ âm và chữ Hán</strong> được giới thiệu từ đơn
                    giản đến phức tạp, giúp người học dễ dàng tiếp thu. Đặc
                    biệt, các điểm <strong>ngữ pháp</strong>
                    được giải thích cặn kẽ, kèm theo ví dụ minh họa rõ ràng,
                    giúp người học hiểu sâu và vận dụng đúng cách.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
