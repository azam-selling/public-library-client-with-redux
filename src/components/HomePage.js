import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import { GetBooks, DeleteBook } from "../Services/BookService";
import { toast } from "react-toastify";
// import { Prompt } from "react-router-dom";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(true);
  const [booksFiltered, setBooksFiltered] = useState([]);
  useEffect(() => {
    if (load) {
      GetBooks().then((result) => {
        setBooks(result);
        setBooksFiltered(result);
        setLoad(false);
      });
    }
  }, [load]);

  /*function handleDelete(event) {
    // <Prompt when={true} message="Do you want to delete?" />;
    DeleteBook(event.target.id);
    toast.success("Book deleted.");
    setLoad(true);
  }*/

  function handleDelete(event) {
    // <Prompt when={true} message="Do you want to delete?" />;
    DeleteBook(event.target.id).then(() => {
      toast.success("Book deleted.");
      setLoad(true);
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

export default HomePage;
