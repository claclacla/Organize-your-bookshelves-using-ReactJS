import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Data from './Data';

class PickBookShelf extends Component {
  static propTypes = {
    goBack: PropTypes.func.isRequired
  }

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

        <div className="close-set-book-shelf">
          <a onClick={this.props.goBack}></a>
        </div>
      </div>
    );
  }
}

export default PickBookShelf