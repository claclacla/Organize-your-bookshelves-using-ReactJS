import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const BookShelf = function (props) {
  const { title, books, bookRepository } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, idx) =>
            <Book key={idx} book={book} bookRepository={bookRepository} />
          )}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  bookRepository: PropTypes.object.isRequired
};

export default BookShelf