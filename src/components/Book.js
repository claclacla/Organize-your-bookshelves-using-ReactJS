import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookShelfChanger from './BookShelfChanger';
import BookImage from './BookImage';

const Book = function (props) {
  const { book } = props;

  var bookShelf = book.shelf;

  if (bookShelf === undefined) {
    bookShelf = "none";
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link to={"/book/" + book.id}>
            <BookImage imageLinks={book.imageLinks}/>
          </Link>
        </div>
        <div className="book-shelf-changer-container">
          <div className="inline">{bookShelf}</div>
          <BookShelfChanger book={book} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{(Array.isArray(book.authors)) && book.authors.map((author, idx) => <div key={idx}>{author}</div>)}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book