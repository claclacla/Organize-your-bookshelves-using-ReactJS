import React from 'react';

const BookImage = function (props) {
  var { imageLinks } = props;
  var style = { width: 128, height: 193 };

  if(imageLinks && imageLinks.thumbnail) {
    style.backgroundImage = 'url(' + imageLinks.thumbnail + ')';
  }

  return (
    <div className="book-cover" style={style}></div>
  );
}

export default BookImage