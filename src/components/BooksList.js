import React from 'react';
import PropTypes from 'prop-types';

import Book from '../components/Book';

const BooksList = function(props) {
  return (
    <div className="search-books-results">
    <ol className="books-grid">
      {props.books.map(book =>
        <Book key={book.id} book={book}/>
      )}
    </ol>
  </div>
  );
}

BooksList.propTypes = {
  books: PropTypes.array.isRequired
}

export default BooksList