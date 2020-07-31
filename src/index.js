import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

import * as Storage from "./utils/storage";

import Book from "./components/Book";

class App extends React.Component {
  constructor () {
    super()

    let books = Storage.readItem("library");

    if (!books) {
      books = books || [
        {title: "King Barleycorn",    author: "Jack London",                      pages: 203, read: true},
        {title: "The Cosmic Puppets", author: "Philip K. Dick",                   pages: 130, read: true},
        {title: "Nightfall",          author: "Isaac Asimov & Robert Silverberg", pages: 376, read: false},
      ];

      Storage.storeItem("library", books);
    }    
    
    this.state = {
      library: books,
    };
  }

  render () {
    return (
      <div>
        {this.state.library.map( book => <Book data={book} /> )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("bookshelf"));
