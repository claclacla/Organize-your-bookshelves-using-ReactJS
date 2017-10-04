import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookShelfChanger from '../components/BookShelfChanger';
import BookImage from '../components/BookImage';

class BookDetail extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    bookRepository: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired
  }

  state = {
    book: null
  }

  componentDidMount() {
    this.props.bookRepository.getById(this.props.bookId).then((book) => {
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
          <BookImage imageLinks={this.state.book.imageLinks}/>
          <div className="book-detail-text">
            <h2>{this.state.book.title}</h2>
            {this.state.book.subtitle} <br /><br />
            <b>Publisher:</b> {this.state.book.publisher} <br />
            <b>Pages:</b> {this.state.book.pageCount}
            <br />
            <div className="book-shelf-changer-container">
              <b className="inline">Shelf:&nbsp;</b> 
              <div className="inline">{this.state.book.shelf}</div>
              <BookShelfChanger book={this.state.book} />
            </div>
            <br />
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