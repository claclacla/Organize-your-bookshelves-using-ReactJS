import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    setBookShelf: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map(book =>
              <Book key={book.id} id={book.id} title={book.title} authors={book.authors} image={book.imageLinks.smallThumbnail} shelf={book.shelf} setBookShelf={this.props.setBookShelf}/>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf