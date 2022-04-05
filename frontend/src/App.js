<<<<<<< HEAD
import { useEffect } from "react";
import { useDispatch } from "react-redux";
=======
>>>>>>> origin/main
import { CartProvider } from "./contexts/cart-context";
import { FavProvider } from "./contexts/fav-context";
import { SearchProvider } from "./contexts/search-context";
import AppRoutes from "./routes";
<<<<<<< HEAD
import { loadFavorites } from "./store/fav";
import "./App.css"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

=======
import "./App.css"
function App() {
>>>>>>> origin/main
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
