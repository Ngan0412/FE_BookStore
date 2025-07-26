import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./ProductSearchPage.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductSearchPage = () => {
  const query = useQuery();
  const keyword = query.get("q") || "";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API khi load component
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://localhost:7226/api/Book/getAll");
        const allBooks = res.data;
        console.log("📦 Dữ liệu trả về:", allBooks);

        const filtered = keyword
          ? allBooks.filter((book) =>
              book.title.toLowerCase().includes(keyword.toLowerCase())
            )
          : allBooks;

        setBooks(filtered);
      } catch (error) {
        console.error("Lỗi khi lấy sách:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [keyword]);

  const baseUrl = "http://localhost:7226";

  return (
    <div className={styles["main-content"]}>
      <div className={styles["main-content__search"]}>
        {/* Filter bên trái */}
        <div className={styles["main-content__left"]}>
          <div className={styles["title-search"]}>
            <strong className={styles["title-search-color"]}>LỌC THEO</strong>
          </div>

          <div className={styles["text_title__searchLeft"]}>
            <div className={styles["title-search"]}>DANH MỤC SÁCH</div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Sách Ngoại Ngữ
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Sách Thiếu Nhi
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Sách Tâm Lý
            </div>
          </div>

          <div className={styles["text_title__searchLeft"]}>
            <p className={styles["title-search"]}>GIÁ</p>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> 0đ-150,000đ
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> 150,000đ - 300,000đ
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> 300,000đ-450,000đ
            </div>
          </div>

          <div className={styles["text_title__searchLeft"]}>
            <p className={styles["title-search"]}>TÁC GIẢ</p>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Nguyễn Nhật Ánh
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Thùy Ngân
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Ngân Trần
            </div>
          </div>

          <div className={styles["text_title__searchLeft"]}>
            <p className={styles["title-search"]}>NHÀ CUNG CẤP</p>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Fahasa
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Tiki
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Kim Đồng
            </div>
          </div>

          <div className={styles["text_title__searchLeft"]}>
            <p className={styles["title-search"]}>NHÀ XUẤT BẢN</p>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Nhà Xuất Bản Kim
              Đồng
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Nhà Xuất Bản Phương
              Nam
            </div>
            <div className={styles["title-book"]}>
              <input type="checkbox" defaultChecked />
              <span className={styles["checkmark"]}></span> Nhà Xuất Bản Thùy
              Ngân
            </div>
          </div>
        </div>

        {/* Sách bên phải */}
        <div className={styles["main-content__right"]}>
          <div className={styles["booklist"]}>
            <div className={styles["main-book"]}>
              <div className={styles["main-listBook__content"]}>
                <div className={styles["listBook__title"]}>
                  <div className={styles["icon-book"]}>
                    <i className="fa-solid fa-book"></i>
                  </div>
                  <div className={styles["title"]}>KẾT QUẢ TÌM KIẾM</div>
                </div>
              </div>

              <div className={styles["main-listBook__item"]}>
                {loading ? (
                  <p>Đang tải sách...</p>
                ) : books.length === 0 ? (
                  <p>Không tìm thấy sách nào.</p>
                ) : (
                  books.map((book) => (
                    <div
                      key={book.id}
                      className={styles["main-listBook__item__child"]}
                    >
                      <img
                        src={
                          book.image
                            ? `${baseUrl}${
                                book.image.startsWith("/")
                                  ? book.image
                                  : "/" + book.image
                              }`
                            : "/styles/img/tamly.webp"
                        }
                        alt={book.title}
                        className={styles["listBook"]}
                      />
                      <div className={styles["item__child__title"]}>
                        <div className={styles["title__book"]}>
                          {book.title}
                        </div>
                        <div className={styles["price__book"]}>
                          <p className={styles["price"]}>
                            {book.price.toLocaleString()} đ
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchPage;
