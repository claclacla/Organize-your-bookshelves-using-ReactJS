import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';

class BookDetail extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    goBack: PropTypes.func.isRequired
  }

  state = {
    book: null
  }

  componentDidMount() {
    BooksAPI.get(this.props.bookId).then((book) => {
      this.setState({ book });
    });
  }

  render() {
    if (this.state.book === null) {
      return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>Loading...</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.state.book.title}</h1>
        </div>
        <div className="list-books-content">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.state.book.imageLinks.thumbnail + ')' }}></div>
        </div>
        <div className="go-back">
          <a onClick={() => { this.props.goBack() }}>Add a book</a>
        </div>
      </div>
    );
  };
}

export default BookDetail