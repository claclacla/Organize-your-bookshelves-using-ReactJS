import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Queue from './Queue';

class SearchBooksText extends Component {
  constructor(props) {
    super(props);

    this.queue = new Queue();

    var searchText = localStorage.getItem("searchText");

    if (searchText) {
      this.state = {
        searchText: searchText
      };
      this.search(searchText);
    }
  }

  static propTypes = {
    search: PropTypes.func.isRequired
  }

  search(searchText) {
    this.queue.push(() => {
      return new Promise((resolve, reject) => {
        this.props.search(searchText).then((res) => {
          resolve(res);
        });
      });
    });
  }

  setSearchText = (event) => {
    var searchText = event.target.value;

    localStorage.setItem("searchText", searchText);

    this.setState({ searchText });
    this.search(searchText);
  }

  render() {
    return (
      <input type="text" onChange={this.setSearchText} value={this.state.searchText} placeholder="Search by title or author" />
    );
  }
}

export default SearchBooksText;