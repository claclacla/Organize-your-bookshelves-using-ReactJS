import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';
import SearchBooksText from './SearchBooksText';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array,
    searchText: PropTypes.string,
    setBookShelf: PropTypes.func.isRequired
  }

  state = {
    searchedBooks: []
  }

  setSearchedBookShelf = (searchedBooks) => {
    searchedBooks = searchedBooks.map(searchedBook => {
      var book = this.props.books.find(book => book.id === searchedBook.id);

      if (book) {
        searchedBook.shelf = book.shelf;
      }

      return searchedBook;
    });

    return searchedBooks;
  }

  search = (text) => {
    return new Promise((resolve, reject) => {
      if (text === "") {
        this.setState({ searchedBooks: [] });
        return resolve([]);
      }

      BooksAPI.search(text, 100).then((searchedBooks) => {
        if (!Array.isArray(searchedBooks)) {
          searchedBooks = [];
        }

        searchedBooks = this.setSearchedBookShelf(searchedBooks);
        this.setState({ searchedBooks });
        resolve(searchedBooks);
      });
    });
  }

  // Add a decorator function to App.setBookShelf() method

  setBookShelf = (book, shelf) => {
    this.props.setBookShelf(book, shelf);

    var bookIdx = this.state.searchedBooks.findIndex(stateBook => stateBook.id === book.id);

    this.setState((state) => {
      state.searchedBooks[bookIdx].shelf = shelf;
      return state;
    });
  }

  render() {
    const { searchedBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <SearchBooksText searchText={this.props.searchText} search={this.search} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map(book =>
              <Book key={book.id} book={book} setBookShelf={this.setBookShelf} />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks