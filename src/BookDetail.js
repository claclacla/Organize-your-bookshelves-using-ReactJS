import React from 'react';
import PropTypes from 'prop-types';

const BookDetail = function (props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>Book detail</h1>
      </div>
      <div className="list-books-content">
      </div>
      <div className="go-back">
        <a onClick={() => {props.goBack()}}>Add a book</a>
      </div>
    </div>
  );
}

BookDetail.propTypes = {
  bookId: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired
}

export default BookDetail