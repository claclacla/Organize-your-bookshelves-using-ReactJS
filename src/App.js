import React from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  setBookShelf = (id, shelf) => {
    var bookIdx = this.state.books.findIndex(book => book.id === id);

    this.setState((state) => {
      state.books[bookIdx].shelf = shelf;
      return state;
    });

    BooksAPI.update(this.state.books[bookIdx], shelf).then((res) => {

    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} setBookShelf={this.setBookShelf}/>
        )}/>
        <Route path="/search" component={SearchBooks}/>
      </div>
    );
  }
}

export default BooksApp
