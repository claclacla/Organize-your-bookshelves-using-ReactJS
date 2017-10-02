import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookShelfChanger from './BookShelfChanger';

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
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
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