import React from 'react';
import PropTypes from 'prop-types';

import BooksList from '../components/BooksList';

const BookShelf = function (props) {
  const { title, books } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <BooksList books={books}/>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
};

export default BookShelf