import React, { useContext, useEffect, useState } from "react";
import { omit } from "underscore";
import * as favApi from "../apis/fav";
import useApi from "../hooks/use-api";

const FavContext = React.createContext({
  fav: {},
  isLoading: false,
  onToggleFav: () => {},
});

export function FavProvider({ children }) {
  const [favItem, setFavItem] = useState({});
  const fav = useApi(favApi.getFavItems, { keyExtractor: "favorites" });
  const user = window.localStorage.getItem("user");

  useEffect(() => {
    fav.request().then((res) => {
      mapResDataToFavItems(res);
    });
  }, [user]);

  const mapResDataToFavItems = (res) => {
    const favs = res.data.favorites;
    const favObj = {};
    favs.forEach((fv) => {
      favObj[fv.id] = fv;
    });
    setFavItem(favObj);
  };

  const toggleFavorite = async (item, isFav, callerFunc) => {
    let apiFunc;
    let newFavItem;

    if (isFav) {
      apiFunc = favApi.removeFromFav;
      newFavItem = omit(favItem, item.id);
    } else {
      apiFunc = favApi.addToFav;
      newFavItem = { ...favItem, [item.id]: item };
    }

    await apiFunc(item.id);
    setFavItem(newFavItem);
    callerFunc();
  };

  return (
    <FavContext.Provider
      value={{
        fav: favItem,
        isLoading: fav.isLoading,
        onToggleFav: toggleFavorite,
      }}
    >
      {children}
    </FavContext.Provider>
  );
}

export const useFavContext = () => useContext(FavContext);
