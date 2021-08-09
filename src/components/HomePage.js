import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as bookActions from "../redux/actions/bookActions";

function HomePage({ books, loadBooks, deleteBook, ...props }) {
  const [booksFiltered, setBooksFiltered] = useState([]);

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch((error) => {
        alert("Load books failed: " + error.message);
      });
    } else {
      setBooksFiltered(books);
    }
  }, [books, loadBooks]);

  function handleDelete(book) {
    deleteBook(book).then(() => {
      toast.success("Book deleted.");
    });
  }

  function handleSearch(event) {
    const bookMatches = books.filter((book) =>
      book.title.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setBooksFiltered(bookMatches);
  }

  return (
    <>
      <div className="App-text">
        <h3>Available Books</h3>
        <div>
          <label style={{ fontSize: 20, fontWeight: "bold" }}>Search:</label>
          <input
            style={{ minWidth: "400px", marginLeft: "15px" }}
            type="text"
            name="searchBox"
            id="searchBox"
            placeholder="search by book title"
            onChange={handleSearch}
          />
        </div>
      </div>
      <BookList books={booksFiltered} onClick={handleDelete} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

const mapDispatchToProps = {
  loadBooks: bookActions.loadBooks,
  deleteBook: bookActions.deleteBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
