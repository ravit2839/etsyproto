import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartProvider } from "./contexts/cart-context";
import { FavProvider } from "./contexts/fav-context";
import { SearchProvider } from "./contexts/search-context";
import AppRoutes from "./routes";
import { loadFavorites } from "./store/fav";
import "./App.css"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

  return (
    <>
      <FavProvider>
        <CartProvider>
          <SearchProvider>
            <AppRoutes />
          </SearchProvider>
        </CartProvider>
      </FavProvider>
    </>
  );
}

export default App;
