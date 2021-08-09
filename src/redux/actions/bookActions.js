import * as actionTypes from "./actionTypes";
import * as BookService from "../../Services/BookService";

export function loadBooksSuccess(books) {
  return {
    type: actionTypes.LOAD_BOOKS_SUCCESS,
    books: books,
  };
}

export function deleteBookSuccess(book) {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS,
    book: book,
  };
}

export function saveBookSuccess(book) {
  return {
    type: actionTypes.SAVE_BOOK_SUCCESS,
    book: book,
  };
}

export function updateBookSuccess(book) {
  return {
    type: actionTypes.UPDATE_BOOK_SUCCESS,
    book,
  };
}

export function loadBooks() {
  return function (dispatch) {
    return BookService.GetBooks()
      .then((books) => {
        dispatch(loadBooksSuccess(books));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteBook(book) {
  return function (dispatch) {
    return BookService.DeleteBook(book._id)
      .then(() => {
        dispatch(deleteBookSuccess(book));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveBook(book) {
  return function (dispatch, getState) {
    return BookService.SaveBook(book)
      .then((bookSaved) => {
        book._id
          ? dispatch(updateBookSuccess(bookSaved))
          : dispatch(saveBookSuccess(bookSaved));
      })
      .catch((error) => {
        throw error;
      });
  };
}
