import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import SearchBooksText from './SearchBooksText';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    books: []
  }

  search = (text) => {
    return new Promise((resolve, reject) => {
      if(text === "") {
        this.setState({ books: [] });
        return resolve([]);
      }

      BooksAPI.search(text, 100).then((books) => {
        if(!Array.isArray(books)) {
          books = [];
        }

        this.setState({ books });
        resolve(books);
      });
    });
  }

  setBookShelf = (id, shelf) => {
    var book = this.state.books.find(book => book.id === id);
  }

  render() {
    const { books } = this.state;

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
              <SearchBooksText search={this.search}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {books.map(book =>               
                <Book key={book.id} id={book.id} title={book.title} authors={book.authors} image={book.imageLinks.smallThumbnail} shelf={book.shelf} setBookShelf={this.setBookShelf}/>
              )}
            </ol>
          </div>
        </div>
    );
  }
}

export default SearchBooks