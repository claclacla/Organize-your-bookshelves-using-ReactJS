import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  CURRENTLY_READING = "currentlyReading";

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
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