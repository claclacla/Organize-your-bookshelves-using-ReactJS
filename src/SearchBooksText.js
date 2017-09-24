import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Queue from './Queue';

class SearchBooksText extends Component {
  constructor() {
    super();

    this.queue = new Queue();
  }

  static propTypes = {
    search: PropTypes.func.isRequired
  }

  state = {
    searchText: ""
  }

  setSearchText = (event) => {
    var searchText = event.target.value;
    this.setState({ searchText });

    this.queue.push(() => {
      return new Promise((resolve, reject) => {
        this.props.search(searchText).then((res) => {
          resolve(res);
        });
      });
    });
  }

  render() {
    return (
      <input type="text" onChange={this.setSearchText} value={this.state.searchText} placeholder="Search by title or author" />
    );
  }
}

export default SearchBooksText;