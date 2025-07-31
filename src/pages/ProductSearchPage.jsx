import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./ProductSearchPage.module.css";
import { Link } from "react-router-dom";

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
  const [authors, setAuthor] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState([]);
  const [publishers, setPublisher] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const [selectedPublisher, setSelectedPublisher] = useState([]);
  const priceRanges = [
    { label: "0đ-150,000đ", min: 0, max: 150000 },
    { label: "150,000đ - 300,000đ", min: 150000, max: 300000 },
    { label: "300,000đ - 450,000đ", min: 300000, max: 450000 },
  ];
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
    const fetchAuthors = async () => {
      try {
        const res = await axios.get("https://localhost:7226/api/Author");
        setAuthor(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy tác giả:", error);
      }
    };

    fetchAuthors();
  }, []);
  useEffect(() => {
    const fetchPublisher = async () => {
      try {
        const res = await axios.get("https://localhost:7226/api/Publisher");
        setPublisher(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy nhà xuất bản:", error);
      }
    };

    fetchPublisher();
  }, []);
  useEffect(() => {
    const fetchBooks = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          const matchPrice =
            selectedPriceRanges.length > 0
              ? selectedPriceRanges.some(
                  (range) => book.price >= range.min && book.price <= range.max
                )
              : true;
          const matchAuthor =
            selectedAuthor.length > 0
              ? selectedAuthor.includes(book.authorId)
              : true;
          const matchPublisher =
            selectedPublisher.length > 0
              ? selectedPublisher.includes(book.publisherId)
              : true;

          return (
            matchKeyword &&
            matchCategory &&
            matchAuthor &&
            matchPublisher &&
            matchPrice
          );
        });

        setBooks(filtered);
      } catch (error) {
        console.error("Lỗi khi lấy sách:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [
    keyword,
    selectedCategories,
    selectedAuthor,
    selectedPublisher,
    selectedPriceRanges,
  ]);

  const baseUrl = "http://localhost:5173";
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
            {priceRanges.map((range, index) => (
              <div key={index} className={styles["title-book"]}>
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.some(
                    (r) => r.min === range.min && r.max === range.max
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPriceRanges((prev) => [...prev, range]);
                    } else {
                      setSelectedPriceRanges((prev) =>
                        prev.filter(
                          (r) => r.min !== range.min || r.max !== range.max
                        )
                      );
                    }
                  }}
                />
                <span className={styles["checkmark"]}></span> {range.label}
              </div>
            ))}
          </div>

          <div className={styles["text_title__searchLeft"]}>
            <div className={styles["title-search"]}>TÁC GIẢ</div>
            {authors.map((author) => (
              <div key={author.id} className={styles["title-book"]}>
                <input
                  type="checkbox"
                  checked={selectedAuthor.includes(author.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAuthor((prev) => [...prev, author.id]);
                    } else {
                      setSelectedAuthor((prev) =>
                        prev.filter((id) => id !== author.id)
                      );
                    }
                  }}
                />
                <span className={styles["checkmark"]}></span> {author.name}
              </div>
            ))}
          </div>

          <div className={styles["text_title__searchLeft"]}>
            <div className={styles["title-search"]}>NHÀ XUẤT BẢN</div>
            {publishers.map((publisher) => (
              <div key={publisher.id} className={styles["title-book"]}>
                <input
                  type="checkbox"
                  checked={selectedPublisher.includes(publisher.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPublisher((prev) => [...prev, publisher.id]);
                    } else {
                      setSelectedPublisher((prev) =>
                        prev.filter((id) => id !== publisher.id)
                      );
                    }
                  }}
                />
                <span className={styles["checkmark"]}></span> {publisher.name}
              </div>
            ))}
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
                    <Link
                      key={book.id}
                      to={`/book/${book.id}`}
                      className={styles["main-listBook__item__child"]}
                      style={{ textDecoration: "none", color: "inherit" }}
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
                        <div className={styles["price__book__new"]}>
                          <p className={styles["price"]}>
                            {book.price.toLocaleString()} đ
                          </p>
                        </div>
                      </div>
                    </Link>
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
