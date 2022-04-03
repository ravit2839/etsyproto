import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    searchVal: "",
    sort: {
      sortKey: "",
      sortOrder: "",
    },
    priceRange: {
      min: 0,
      max: 0,
    },
    isOutOfStock: false,
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleSearchVal: (state, action) => {
      state.data.searchVal = action.payload;
    },
    handleSortKey: (state, action) => {
      state.data.sort.sortKey = action.payload;
    },
    handleSortOrder: (state, action) => {
      state.data.sort.sortOrder = action.payload;
    },
    handleMinPrice: (state, action) => {
      state.data.priceRange.min = action.payload;
    },
    handleMaxPrice: (state, action) => {
      state.data.priceRange.max = action.payload;
    },
    handleIsOutOfStock: (state, action) => {
      state.data.isOutOfStock = action.payload;
    },
    handleReset: (state, action) => {
      state.data = {
        searchVal: "",
        sort: {
          sortKey: "",
          sortOrder: "",
        },
        priceRange: {
          min: 0,
          max: 0,
        },
        isOutOfStock: false,
      };
    },
  },
});

export const {
  handleSearchVal,
  handleSortKey,
  handleSortOrder,
  handleMinPrice,
  handleMaxPrice,
  handleIsOutOfStock,
  handleReset,
} = searchSlice.actions;

export default searchSlice.reducer;
