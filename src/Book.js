import React, { Component } from 'react';
import PropTypes from 'prop-types';

// https://facebook.github.io/react/docs/lifting-state-up.html
// https://facebook.github.io/react/docs/lifting-state-up.html#lifting-state-up

class Book extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    image: PropTypes.string,
    shelf: PropTypes.string,
    setBookShelf: PropTypes.func.isRequired
  }

  state = {
    bookshelf: ""
  }

  setBookShelf = (event) => {
    this.props.setBookShelf(this.props.id, event.target.value);
  }

  render() {
    const { title, authors, image, shelf } = this.props;

/*className="book-shelf-changer"*/

    return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + image + ')' }}></div>
          <div>
            {shelf}
            <select value={shelf} onChange={this.setBookShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{(Array.isArray(authors)) && authors.map((author, idx) => <div key={idx}>{author}</div>)}</div>
      </div>
    </li>
    );
  }
}

export default Book