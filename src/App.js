import React from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import BookDetail from './BookDetail';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  setBookShelf = (book, shelf) => {
    var bookIdx = this.state.books.findIndex(stateBook => stateBook.id === book.id);

    this.setState((state) => {
      if (bookIdx >= 0) {
        state.books[bookIdx].shelf = shelf;
      }
      else {
        book.shelf = shelf;
        state.books.push(book);
      }

      return state;
    });

    BooksAPI.update(book, shelf).then((res) => {

    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} setBookShelf={this.setBookShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} setBookShelf={this.setBookShelf} />
        )} />
        <Route path="/book/:bookId" render={(routeProps) => {
          return (
            <BookDetail bookId={routeProps.match.params.bookId} goBack={routeProps.history.goBack} />
          );
        }} />
      </div>
    );
  }
}

export default BooksApp
