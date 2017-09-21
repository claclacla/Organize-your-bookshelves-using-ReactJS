import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Data from './Data';
import * as BooksAPI from './BooksAPI';

class PickBookShelf extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    setBookShelf: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }

  setBookShelf = (shelf) => {
    BooksAPI.get(this.props.bookId).then((book) => {
      BooksAPI.update(book, shelf).then((res) => {
        this.props.setBookShelf(book, shelf);
        this.props.goBack();
      });
    });
  }

  render() {
    return (
      <div className="set-book-shelf">
        <div className="set-book-shelf-title">
          <h1>Pick book shelf</h1>
        </div>

        <ol className="book-shelf-title-grid">
          <li><a onClick={() => { this.setBookShelf(Data.currentlyReading.value) }}>{Data.currentlyReading.title}</a></li>
          <li><a onClick={() => { this.setBookShelf(Data.wantToRead.value) }}>{Data.wantToRead.title}</a></li>
          <li><a onClick={() => { this.setBookShelf(Data.read.value) }}>{Data.read.title}</a></li>
        </ol>

        <div className="close-set-book-shelf">
          <a onClick={this.props.goBack}></a>
        </div>
      </div>
    );
  }
}

export default PickBookShelf