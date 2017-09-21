import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBooksText extends Component {

  //  https://facebook.github.io/react/docs/state-and-lifecycle.html#adding-local-state-to-a-class

  constructor(props) {
    super(props);

    var searchText = "";

    if(props.searchText) {
      searchText = props.searchText;
      this.props.search(searchText);
    }

    this.state = {
      searchText: searchText
    };
  }

  static propTypes = {
    search: PropTypes.func.isRequired,
    searchText: PropTypes.string
  }

  setSearchText = (searchText) => {
    this.setState({ searchText });
    this.props.search(searchText);
  }

  render() {
    return (
      <input type="text" onChange={(event) => {this.setSearchText(event.target.value)}} value={this.state.searchText} placeholder="Search by title or author" />
    );
  }
}

export default SearchBooksText;