import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBooksText extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired
  }

  state = {
    searchText: ""
  }

  setSearchText = (event) => {
    var searchText = event.target.value;

    this.setState({ searchText });
    this.props.search(searchText);
  }

  render() {
    return (
      <input type="text" onChange={this.setSearchText} value={this.state.searchText} placeholder="Search by title or author"/>
    );
  }
}

export default SearchBooksText;