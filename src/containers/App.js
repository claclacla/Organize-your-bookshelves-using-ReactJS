import React from 'react';
import { Route } from 'react-router-dom';
import * as PubSubJs from 'pubsub-js';

import AppLocalStorageRepository from '../repositories/LocalStorage/AppLocalStorageRepository';
import BookRESTRepository from '../repositories/REST/BookRESTRepository';
import Util from '../lib/Util';
import '../App.css';
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
    this.bookRepository = new BookRESTRepository();

    PubSubJs.subscribe("book.set.shelf", (msg, data) => {
      this.setBookShelf(data.book, data.shelf);
    });
  }

  setBookShelf = (book, shelf) => {
    var bookIdx = this.state.books.findIndex(currentBook => currentBook.id === book.id);

    if(bookIdx >= 0) {
      this.setState.books[bookIdx].shelf = shelf;
    }
    else {
      book.shelf = shelf;
      this.books.push(book);
    }
  }

  getBooks = () => {
    return new Promise((resolve, reject) => {
      this.bookRepository.get().then((books) => {
        this.setState({ books });
        resolve();
      })
    });
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} bookRepository={this.bookRepository}/>
        )} />
        <Route path="/pick-book-shelf" render={(routeProps) => {
          var queryParams = Util.getQueryParams(routeProps.location.search);

          return (<PickBookShelf bookId={queryParams.bookId} bookShelf={queryParams.bookShelf} bookRepository={this.bookRepository} goBack={routeProps.history.goBack}/>);
          }} />
        <Route path="/search" render={() => (
          <SearchBooks appRepository={this.appLocalStorageRepository} bookRepository={this.bookRepository} books={this.state.books}/>
        )} />
        <Route path="/book/:bookId" render={(routeProps) => {
          return (
            <BookDetail bookId={routeProps.match.params.bookId} bookRepository={this.bookRepository} goBack={routeProps.history.goBack} />
          );
        }} />
      </div>
    );
  }
}

export default BooksApp
