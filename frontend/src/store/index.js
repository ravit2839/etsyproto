import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./fav";
import cartReducer from "./cart";
import searchReducer from "./search";

const store = configureStore({
  reducer: {
    favorite: favReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export { store };
