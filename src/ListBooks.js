import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Data from './Data';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    setBookShelf: PropTypes.func.isRequired
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
            <BookShelf title="Currently reading" books={books.filter(book => book.shelf === Data.CURRENTLY_READING)} setBookShelf={this.props.setBookShelf}/>
            <BookShelf title="Want to read" books={books.filter(book => book.shelf === Data.WANT_TO_READ)} setBookShelf={this.props.setBookShelf}/>
            <BookShelf title="Read" books={books.filter(book => book.shelf === Data.READ)} setBookShelf={this.props.setBookShelf}/>
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