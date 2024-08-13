import React from "react";
import BookCard from "./BookCard";

export default function SearchResults({ books, onAdd }) {
  return (
    <ul>
      {books?.map((book) => (
        <BookCard book={book} onAdd={onAdd} key={book.id} />
      ))}
    </ul>
  );
}