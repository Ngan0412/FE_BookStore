import React from "react";
import BookDetailPage from "../components/product/BookDetail.jsx";
import RelatedBooks from "../components/product/BookRelated.jsx";
import BookSuggestions from "../components/common/SuggestProductGrid.jsx";
import ChatBot from "../components/home/ChatBot.jsx";
import "../pages/BookDetailPage.css";
function BookDetailPages() {
  return (
    <div className="BookDetailPage">
      <BookDetailPage />
      <RelatedBooks />
      <BookSuggestions />
      <ChatBot />
    </div>
  );
}
export default BookDetailPages;
