import React from "react";

export default function BookCard({ book, onAdd }) {
    console.log(book);
  const { imageLinks, title, authors,publisher,publishedDate,description } = book.volumeInfo;
  return (
    <div onClick={() => onAdd(book)}>
      <img src={imageLinks?.thumbnail} />
      <h3>{title}</h3>
      <p>Author: {authors}</p>
      <p>Publisher: {publisher}</p>
      <p>Publish Date: {publishedDate}</p>
      <p>{description}</p>
    </div>
  );
}