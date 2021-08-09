import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as bookActions from "../redux/actions/bookActions";
import { connect } from "react-redux";

const initBook = { title: "", genre: "", author: "", availableQty: "" };

function ManageBookPage({ books, actions, ...props }) {
  const [errors, setErrors] = useState({});
  const [book, setBook] = useState({ ...initBook });

  useEffect(() => {
    if (books.length === 0) {
      actions.loadBooks().catch((error) => {
        alert("Load books failed:- " + error.message);
      });
    } else {
      setBook({ ...props.book });
    }
  }, [actions, books.length, props.book]);

  function handleChange({ target }) {
    setBook({ ...book, [target.name]: target.value });
  }

  function isFormValid() {
    const _errors = {};
    if (!book.title) _errors.title = "Title is required";
    if (!book.genre) _errors.genre = "Genre is required";
    if (!book.author) _errors.author = "Author is required";
    if (!book.availableQty)
      _errors.availableQty = "Available Quantity is required";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    await actions.saveBook(book);
    props.history.push("/");
    toast.success("Book saved.");
  }
  return (
    <>
      <div className="Applocal">
        <h4>Manage book</h4>
        <p>
          Here you can update details of existing books Or can add new book into
          library.
        </p>
      </div>
      <BookForm
        book={book}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
}

function mapStateToProps(state, ownProps) {
  const bookId = ownProps.match.params.bookId;
  const book =
    bookId && state.books.length > 0
      ? state.books.find((book) => book._id === bookId)
      : initBook;
  return {
    books: state.books,
    book,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookPage);
