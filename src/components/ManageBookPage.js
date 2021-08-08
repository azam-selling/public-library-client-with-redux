import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import * as BookService from "../Services/BookService";
import { toast } from "react-toastify";

function ManageBookPage(props) {
  const [errors, setErrors] = useState({});
  const [book, setBook] = useState({
    title: "",
    genre: "",
    author: "",
    availableQty: "",
  });

  useEffect(() => {
    const bookId = props.match.params.bookId;
    if (bookId) {
      BookService.GetBookByID(bookId).then((_book) => {
        setBook(_book);
      });
    }
  }, [props.match.params.bookId]);

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
    await BookService.SaveBook(book).then((result) => setBook(result));
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

export default ManageBookPage;
