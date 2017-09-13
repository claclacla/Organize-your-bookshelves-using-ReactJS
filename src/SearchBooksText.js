import React, { Component } from 'react';

import * as BooksAPI from './BooksAPI';

class SearchBooksText extends Component {
  state = {
    searchText: ""
  }

  setSearchText = (event) => {
    this.setState({searchText: event.target.value});

    // TODO: Move the code below on a SearchBooks method passed as prop

    BooksAPI.search(this.state.searchText, 10).then((books) => {
      console.log(books);
    })
  }

  render() {
    return (
      <input type="text" onChange={this.setSearchText} value={this.state.searchText} placeholder="Search by title or author"/>
    );
  }
}

export default SearchBooksText;