import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="book-detail-content">
          <div className="book-detail-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.state.book.imageLinks.thumbnail + ')' }}></div>
          <div className="book-detail-text">
            <h2>{this.state.book.title}</h2>
            {this.state.book.subtitle} <br /><br />
            <b>Publisher:</b> {this.state.book.publisher} <br />
            <b>Pages:</b> {this.state.book.pageCount}
            <br />
            <b className="inline">Shelf:&nbsp;</b> <div className="inline">{this.state.book.shelf}</div>
            <Link to={"/pick-book-shelf?bookId=" + this.state.book.id + "&bookShelf=" + this.state.book.shelf}><div className="book-detail-shelf-changer inline"></div></Link>
            <br /><br />
            {this.state.book.description}
          </div>
        </div>
        <div className="go-back">
          <a onClick={() => { this.props.goBack() }}>Add a book</a>
        </div>
      </div>
    );
  };
}

export default BookDetail