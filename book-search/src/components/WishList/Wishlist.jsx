import React from "react";

export default function Wishlist({ wishlist, onDelete }) {
  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist?.map((book) => (
          <div key={book.id}>
            <span>{book.volumeInfo.title}</span>
            <button onClick={() => onDelete(book.id)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}