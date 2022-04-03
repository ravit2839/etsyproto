import { createSlice } from "@reduxjs/toolkit";
import { omit } from "underscore";
import * as favApi from "../../apis/fav";

const initialState = {
  fav: {},
  isLoading: false,
};

const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favRequested: (fav, _) => {
      fav.isLoading = true;
    },
    favReceived: (fav, action) => {
      const favs = action.payload.favorites;
      const favObj = {};
      favs.forEach((fv) => {
        favObj[fv._id] = fv;
      });

      fav.isLoading = false;
      fav.fav = favObj;
    },
    toggleFav: (fav, action) => {
      const { isFav, item } = action.payload;
      let newFavItem;

      if (isFav) {
        newFavItem = omit(fav.fav, item._id);
      } else {
        newFavItem = { ...fav.fav, [item._id]: item };
      }

      fav.fav = newFavItem;
    },
  },
});

const { favRequested, favReceived, toggleFav } = favSlice.actions;
export default favSlice.reducer;

export const loadFavorites = () => async (dispatch, getState) => {
  dispatch(favRequested());

  const res = await favApi.getFavItems();
  console.log("loadFavorites store: ", res);
  const favorites = res.data.favorites;

  dispatch(favReceived({ favorites }));
};

export const onToggleFavorite =
  (item, isFav, callerFunc) => async (dispatch, getState) => {
    let apiCall;

    if (isFav) {
      apiCall = favApi.removeFromFav;
    } else {
      apiCall = favApi.addToFav;
    }

    await apiCall(item._id);
    dispatch(toggleFav({ item, isFav }));
    callerFunc();
  };
