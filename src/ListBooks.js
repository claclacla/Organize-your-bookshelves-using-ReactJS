import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Data from './Data';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently reading" books={books.filter(book => book.shelf === Data.currentlyReading.value)}/>
            <BookShelf title="Want to read" books={books.filter(book => book.shelf === Data.wantToRead.value)}/>
            <BookShelf title="Read" books={books.filter(book => book.shelf === Data.read.value)}/>
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