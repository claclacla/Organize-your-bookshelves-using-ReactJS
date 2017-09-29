import React from 'react';
import { Route } from 'react-router-dom';

import AppLocalStorageRepository from './repositories/LocalStorage/AppLocalStorageRepository';
import Util from './lib/Util';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import BookDetail from './BookDetail';
import PickBookShelf from './PickBookShelf';

class BooksApp extends React.Component {
  constructor() {
    super();
    
    this.state = {
      books: []
    };

    this.appLocalStorageRepository = new AppLocalStorageRepository();
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
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books}/>
        )} />
        <Route path="/pick-book-shelf" render={(routeProps) => {
          var queryParams = Util.getQueryParams(routeProps.location.search);

          return (<PickBookShelf bookId={queryParams.bookId} bookShelf={queryParams.bookShelf} setBookShelf={this.setBookShelf} goBack={routeProps.history.goBack}/>);
          }} />
        <Route path="/search" render={() => (
          <SearchBooks appRepository={this.appLocalStorageRepository} books={this.state.books}/>
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
