import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchBooks = createAsyncThunk('/book/fetchBooks', async (query) => {
    if (query.trim()) {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
        );
        const data = await response.json();
        return data.items
    }
})

export const bookSlice = createSlice({
    name: "books",
    initialState: {
        wishBooks: [],
        books: [],
        status: 'null'
    },

    reducers: {
        addToWishBook: (state, action) => {

            if (!state.wishBooks.find(book => book.id === action.payload.id)) {
                state.wishBooks.push(action.payload);
            }


        },

        removeToWishBook: (state, action) => {
            state.wishBooks = state.wishBooks.filter((book) => book.id !== action.payload.id)
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succedd';
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                console.error("Failed to fetch books:", action.error.message);
            })
            .addCase(fetchBooks.pending,(state) =>{
                state.status = 'loading';
            });
    }
});

export const { addToWishBook, removeToWishBook } = bookSlice.actions;

export default bookSlice.reducer;