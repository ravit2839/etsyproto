import React, { useContext, useState } from "react";

const SearchContext = React.createContext({
  data: {
    searchVal: "",
    sort: {
      sortKey: "",
      sortOrder: "",
    },
    priceRange: {
      min: "",
      max: "",
    },
    isOutOfStock: false,
  },
  handleSearchVal: () => {},
  handleSortKey: () => {},
  handleSortOrder: () => {},
  handleMinPrice: () => {},
  handleMaxPrice: () => {},
  handleIsOutOfStock: () => {},
  handleReset: () => {},
});

export function SearchProvider({ children }) {
  const [searchVal, setSearchVal] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const handleSearchVal = (val) => {
    setSearchVal(val);
  };

  const handleSortKey = (val) => {
    setSortKey(val);
  };

  const handleSortOrder = (val) => {
    setSortOrder(val);
  };

  const handleMinPrice = (val) => {
    setMinPrice(val);
  };

  const handleMaxPrice = (val) => {
    setMaxPrice(val);
  };

  const handleIsOutOfStock = (val) => {
    setIsOutOfStock(val);
  };

  const handleReset = () => {
    setSortKey("");
    setSortOrder("");
    setMinPrice("");
    setMaxPrice("");
    setIsOutOfStock(false);
  };

  return (
    <SearchContext.Provider
      value={{
        data: {
          searchVal,
          sort: { sortKey, sortOrder },
          priceRange: { min: minPrice, max: maxPrice },
          isOutOfStock,
        },
        handleSearchVal,
        handleSortKey,
        handleSortOrder,
        handleMinPrice,
        handleMaxPrice,
        handleIsOutOfStock,
        handleReset,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
