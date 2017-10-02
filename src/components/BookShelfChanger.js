import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as PubSubJs from 'pubsub-js';

class BookShelfChanger extends Component {
  constructor(props) {
    super(props);

    var bookShelf = props.book.shelf;

    if (bookShelf === undefined) {
      bookShelf = "none";
    }

    this.state = {
      bookShelf: bookShelf
    };
  }

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  setBookShelf = (bookShelf) => {
    this.setState({ bookShelf });
    PubSubJs.publish("books.setBookShelf", { book: this.props.book, shelf: bookShelf });
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.bookShelf} onChange={(event) => { this.setBookShelf(event.target.value) }}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger