import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';

import Data from './Data';
import * as BooksAPI from './BooksAPI';

class PickBookShelf extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    bookShelf: PropTypes.string.isRequired,
    setBookShelf: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }

  state = {
    bookShelfNotSelected: true
  }

  setBookShelf = (shelf) => {
    this.setState({bookShelfNotSelected: false});

    BooksAPI.get(this.props.bookId).then((book) => {
      BooksAPI.update(book, shelf).then((res) => {
        this.props.setBookShelf(book, shelf);
        this.props.goBack();
      });
    });
  }

  render() {
    var currentlyReadingClasses = "cursor-pointer";
    var wantToReadClasses = "cursor-pointer";
    var readClasses = "cursor-pointer";
    var noneClasses = "cursor-pointer";

    switch (this.props.bookShelf) {
      case Data.currentlyReading.value:
        currentlyReadingClasses += " color-green";
        break;
      case Data.wantToRead.value:
        wantToReadClasses += " color-green";
        break;
      case Data.read.value:
        readClasses += " color-green";
        break;
      default:
        noneClasses += " color-green";
        break;
    }

    return (
      <div className="set-book-shelf">
        <div className="set-book-shelf-title">
          <h1>Pick book shelf</h1>
        </div>

        <Loader loaded={this.state.bookShelfNotSelected}>
        <ol className="book-shelf-title-grid">
          <li><div className={currentlyReadingClasses} onClick={() => { this.setBookShelf(Data.currentlyReading.value) }}>{Data.currentlyReading.title}</div></li>
          <li><div className={wantToReadClasses} onClick={() => { this.setBookShelf(Data.wantToRead.value) }}>{Data.wantToRead.title}</div></li>
          <li><div className={readClasses} onClick={() => { this.setBookShelf(Data.read.value) }}>{Data.read.title}</div></li>
          <li><div className={noneClasses} onClick={() => { this.setBookShelf(Data.none.value) }}>{Data.none.title}</div></li>
        </ol>
        </Loader>

        <div className="close-set-book-shelf">
          <a onClick={this.props.goBack}></a>
        </div>
      </div>
    );
  }
}

export default PickBookShelf