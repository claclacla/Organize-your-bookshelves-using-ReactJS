import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Book = function(props) {
  render() {
    const { book } = this.props;

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
          <Link to={"/pick-book-shelf?bookId=" + book.id + "&bookShelf=" + book.shelf}><div className="book-shelf-changer"></div></Link>
          <div className="book-shelf">{bookShelf}</div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{(Array.isArray(book.authors)) && book.authors.map((author, idx) => <div key={idx}>{author}</div>)}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book