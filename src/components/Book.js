import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as PubSubJs from 'pubsub-js';

import BookDTO from '../dtos/BookDTO';

class Book extends Component {
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
    book: PropTypes.object.isRequired,
    bookRepository: PropTypes.object.isRequired
  }

  setBookShelf = (bookShelf) => {
    this.setState({ bookShelf });

    var bookDTO = new BookDTO(this.props.book.id);
    bookDTO.shelf = bookShelf;

    this.props.bookRepository.update(bookDTO).then((res) => {
      //PubSubJs.publish("books.get", () => {
      //  this.props.goBack();
      //});
    });
  }

  render() {
    const { book } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <Link to={"/book/" + book.id}>
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
            </Link>
          </div>
          <div className="book-shelf-changer">
            <select value={this.state.bookShelf} onChange={(event) => { this.setBookShelf(event.target.value) }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
          <div className="book-shelf">{this.state.bookShelf}</div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{(Array.isArray(book.authors)) && book.authors.map((author, idx) => <div key={idx}>{author}</div>)}</div>
        </div>
      </li>
    );
  }
}

export default Book