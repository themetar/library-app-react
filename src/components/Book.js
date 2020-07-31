import React from "react";

function Book (props) {
  const book = props.data;
  const callbacks = props.callbacks;

  return (
    <div className="book">
      <div className="cover">
        <p className="author">{book.author}</p>
        <p className="title">{book.title}</p>
      </div>
      <input  type="checkbox" id={`read-${book.id}`} checked={book.read}
              onChange={() => callbacks.changeRead(book.id)}
      />
      <label htmlFor={`read-${book.id}`}>read</label>
      <button>remove</button>
    </div>
  );
}

export default Book;
