import React from "react";

function Book (props) {
  const book = props.data;
  return (
    <div className="book">
      <div className="cover">
        <p className="author">{book.author}</p>
        <p className="title">{book.title}</p>
      </div>
      <input type="checkbox" checked={book.read} />
      <label>read</label>
      <button>remove</button>
    </div>
  );
}

export default Book;
