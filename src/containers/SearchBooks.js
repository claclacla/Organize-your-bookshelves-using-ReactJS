import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchBooksText from '../components/SearchBooksText';
import Book from '../components/Book';

class SearchBooks extends Component {
  static propTypes = {
    appRepository: PropTypes.object.isRequired,
    bookRepository: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired
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

      this.props.bookRepository.get(text).then((searchedBooks) => {
        if (!Array.isArray(searchedBooks)) {
          searchedBooks = [];
        }

        searchedBooks = this.setSearchedBookShelf(searchedBooks);
        this.setState({ searchedBooks });
        resolve(searchedBooks);
      });
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
            <SearchBooksText appRepository={this.props.appRepository} search={this.search} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map(book =>
              <Book key={book.id} book={book}/>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks