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
      shouldShowForm: false,
    };

    this.changeRead = this.changeRead.bind(this);
    this.removeBook = this.removeBook.bind(this);
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

  removeBook (id) {
    this.setState(prevState => {
      const books = prevState.library.filter(book => book.id != id);

      this.uidTracker.freeID(id)
  
      this.storeLibrary(books);

      return ({...prevState, library: books});
    });
  }

  render () {
    const Books = this.state.library.map( book => <Book key={book.id} data={book} callbacks={{changeRead: this.changeRead, removeBook: this.removeBook}} /> );
    return (
      <div>
        <div className="button-container">
          <button type="button" className="topside-flat" onClick={() => this.setState({shouldShowForm: true})}>Add Book</button>
        </div>
        <div id="bookshelf">
          {
            Books.length > 0 ?
            Books :
            <p>No books in the Library</p>
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
