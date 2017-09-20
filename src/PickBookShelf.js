import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Data from './Data';

class PickBookShelf extends Component {
  render() {
    return (
      <div className="set-book-shelf">
        <div className="set-book-shelf-title">
          <h1>Pick book shelf</h1>
        </div>

        <ol className="book-shelf-title-grid">
          <li>{Data.currentlyReading.title}</li>
          <li>{Data.wantToRead.title}</li>
          <li>{Data.read.title}</li>
        </ol>

        <div className="open-search">
          <Link to="/">Got to home</Link>
        </div>
      </div>
    );
  }
}

export default PickBookShelf