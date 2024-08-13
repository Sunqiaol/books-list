import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResult/SearchResult';
import { useState } from 'react';
import Wishlist from './components/WishList/Wishlist';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/loading/loading';
import { addToWishBook, fetchBooks, removeToWishBook } from './redux/slices/BookSlice';
function App() {

  const dispatch = useDispatch();
  const wishBooks = useSelector((state) => state.books.wishBooks);
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const [selectedBook, setSelectedBook] = useState(null);
  const handleSearch = async (query) => {
    dispatch(fetchBooks(query));
  };

  const handleDeleteBook = (id) => {

    dispatch(removeToWishBook({ id }));
    console.log(wishBooks);
  };

  const handleOnClickBook = (book) => {

    dispatch(addToWishBook(book));
  }
  return (
    <div className="book-search">
      <div className='search'>
        <SearchBar onSubmit={handleSearch} books={books}   setSelectedBook={setSelectedBook}/>

        {status === 'waiting' ?
          <Loading />
          : <SearchResults books={books} onAdd={handleOnClickBook} books={selectedBook ? [selectedBook] : undefined}/>}


      </div>
      <div>
        <Wishlist wishlist={wishBooks} onDelete={handleDeleteBook} />
      </div>
    </div>
  );
}

export default App;
