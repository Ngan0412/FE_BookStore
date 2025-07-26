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
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Gọi API khi load component
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://localhost:7226/api/Category");
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://localhost:7226/api/Book/getAll");
        const allBooks = res.data;
        console.log("📦 Dữ liệu trả về:", allBooks);

        const filtered = allBooks.filter((book) => {
          const matchKeyword = keyword
            ? book.title.toLowerCase().includes(keyword.toLowerCase())
            : true;

          const matchCategory =
            selectedCategories.length > 0
              ? selectedCategories.includes(book.categoryId)
              : true;

          return matchKeyword && matchCategory;
        });

        setBooks(filtered);
      } catch (error) {
        console.error("Lỗi khi lấy sách:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [keyword, selectedCategories]);

  const baseUrl = "http://localhost:7226";
  // Hàm xử lý ảnh
  const resolveImageUrl = (imagePath) => {
    if (!imagePath) return "/styles/img/tamly.webp"; // Ảnh mặc định nếu không có ảnh
    if (imagePath.startsWith("http")) return imagePath; // Nếu ảnh là URL đầy đủ thì dùng luôn
    return `${baseUrl}${
      imagePath.startsWith("/") ? imagePath : "/" + imagePath
    }`; // Ghép baseUrl với ảnh
  };

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
            {categories.map((category) => (
              <div key={category.id} className={styles["title-book"]}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories((prev) => [...prev, category.id]);
                    } else {
                      setSelectedCategories((prev) =>
                        prev.filter((id) => id !== category.id)
                      );
                    }
                  }}
                />
                <span className={styles["checkmark"]}></span> {category.name}
              </div>
            ))}
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
                        src={resolveImageUrl(book.image)}
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
