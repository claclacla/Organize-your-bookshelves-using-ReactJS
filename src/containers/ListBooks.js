import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Data from '../Data';
import BookShelf from '../components/BookShelf';

const ListBooks = function (props) {
  const { books, bookRepository } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title="Currently reading" bookRepository={bookRepository} books={books.filter(book => book.shelf === Data.currentlyReading.value)} />
          <BookShelf title="Want to read" bookRepository={bookRepository} books={books.filter(book => book.shelf === Data.wantToRead.value)} />
          <BookShelf title="Read" bookRepository={bookRepository} books={books.filter(book => book.shelf === Data.read.value)} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  bookRepository: PropTypes.object.isRequired
}

export default ListBooks