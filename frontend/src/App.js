import { CartProvider } from "./contexts/cart-context";
import { FavProvider } from "./contexts/fav-context";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <FavProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </FavProvider>
    </>
  );
}

export default App;
