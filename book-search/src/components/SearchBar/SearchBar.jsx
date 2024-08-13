import React, { useCallback, useEffect, useState,useRef } from "react";
import _ from "lodash";
import "./SearchBar.css";

export default function SearchBar({ onSubmit,books,setSelectedBook }) {
  const [inputValue, setInputValue] = useState("");
  const [showAutocomplete,setShowAutocomplete] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const searchElRef = useRef(null);

  // debounce - delay the execution of a function
  // throttle - limit the frequency of a fucntion call
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleShowAutocomplete = () => {
    setShowAutocomplete(true);
  };

  const handleClick = (e, book) => {
    setSelectedBook(book);
    handleHideAutocomplete();
  };

  const handleHideAutocomplete = () => {
    setShowAutocomplete(false);
  };


  const handleClickOutside = (e) => {
    if (searchElRef.current && !searchElRef.current.contains(e.target)) {
      handleHideAutocomplete();
    }
  };

  const debouncedOnSubmit = useCallback(_.debounce(onSubmit, 1000), [onSubmit]);


  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    debouncedOnSubmit(inputValue);


    
  }, [inputValue]);


  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "ArrowDown") {
      setActiveOption((prev) => {
        return prev < books.length - 1 ? prev + 1 : prev;
      });
    } else if (e.key === "ArrowUp") {
      setActiveOption((prev) => {
        return prev > 0 ? prev - 1 : prev;
      });
    } else if (e.key === "Enter") {
      setSelectedBook(books[activeOption]);
      handleHideAutocomplete();
    } else if (e.key === "Escape") {
      handleHideAutocomplete();
    }
  };
  
  return (
    <div ref={searchElRef}>
      <input
        value={inputValue}
        onChange={handleChange}
        onClick={handleShowAutocomplete}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => {
          onSubmit(inputValue);
        }}
      >
        Submit
      </button>
      {showAutocomplete && (
        <ul className="autocomplete">
          {books?.map((book, index) => (
            <li
              className={`option ${
                index === activeOption ? "active-option" : ""
              }`}
              key={book.id}
              onClick={(e) => handleClick(e, book)}
            >
              {book.volumeInfo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}