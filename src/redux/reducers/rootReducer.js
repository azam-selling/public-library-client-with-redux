import { combineReducers } from "redux";
import books from "./bookReducer";

const rootReducer = combineReducers({
  books: books,
});

export default rootReducer;
