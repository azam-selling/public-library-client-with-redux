import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function bookReducer(state = initialState.books, action) {
  switch (action.type) {
    case actionTypes.LOAD_BOOKS_SUCCESS:
      return action.books;

    case actionTypes.DELETE_BOOK_SUCCESS:
      return state.filter((book) => book._id !== action.book._id);

    case actionTypes.SAVE_BOOK_SUCCESS:
      return [...state, { ...action.book }];

    case actionTypes.UPDATE_BOOK_SUCCESS:
      return state.map((book) =>
        book._id === action.book._id ? action.book : book
      );

    default:
      return state;
  }
}
