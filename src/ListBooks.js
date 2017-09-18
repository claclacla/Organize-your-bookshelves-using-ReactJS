import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  CURRENTLY_READING = "currentlyReading";
  READ = "read";
  WANT_TO_READ = "wantToRead";

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  setBookShelf = (id, shelf) => {
    var bookIdx = this.state.books.findIndex(book => book.id === id);

    this.setState((state) => {
      state.books[bookIdx].shelf = shelf;
      return state;
    });

    BooksAPI.update(this.state.books[bookIdx], shelf).then((res) => {

    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently reading" books={this.state.books.filter(book => book.shelf === this.CURRENTLY_READING)} />
            <BookShelf title="Want to read" books={this.state.books.filter(book => book.shelf === this.WANT_TO_READ)} />
            <BookShelf title="Read" books={this.state.books.filter(book => book.shelf === this.READ)} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks