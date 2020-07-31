import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

import * as Storage from "./utils/storage";
import makeUidTracker from "./utils/uid";

import Book from "./components/Book";

class App extends React.Component {
  constructor () {
    super()

    this.uidTracker = makeUidTracker();

    let books = Storage.readItem("library");

    if (!books) {
      books = [
        {title: "King Barleycorn",    author: "Jack London",                      pages: 203, read: true},
        {title: "The Cosmic Puppets", author: "Philip K. Dick",                   pages: 130, read: true},
        {title: "Nightfall",          author: "Isaac Asimov & Robert Silverberg", pages: 376, read: false},
      ];

      Storage.storeItem("library", books);
    }

    books.forEach(book => {
      book.id = this.uidTracker.getID();
    });
    
    this.state = {
      library: books,
    };

    this.changeRead = this.changeRead.bind(this);
  }

  storeLibrary (library) {
    const books = library.map(book => {
      const book_copy = {...book};
      delete book_copy.id;
      return book_copy;
    });
    
    Storage.storeItem("library", books);
  }

  changeRead (id) {
    this.setState(prevState => {
      const books = prevState.library.map(book => {
        if (book.id == id) {
          return {...book, read: !book.read};
        }
        // else
        return book;
      });
  
      this.storeLibrary(books);
      
      return ({...prevState, library: books});
    });
  }

  render () {
    return (
      <div>
        {this.state.library.map( book => <Book key={book.id} data={book} callbacks={{changeRead: this.changeRead}} /> )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("bookshelf"));
