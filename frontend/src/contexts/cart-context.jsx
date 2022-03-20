import React, { useContext, useState } from "react";
import { omit } from "underscore";

const CartContext = React.createContext({
  cart: {},
  onAddToCart: () => {},
  onRemoveFromCart: () => {},
  onResetCart: () => {},
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const handleAddToCart = (item, quantity) => {
    let newCart = { ...cart };

    if (cart[item.id]) {
      newCart[item.id].quantity = newCart[item.id].quantity + quantity;
    } else {
      newCart[item.id] = item;
      newCart[item.id].quantity = quantity;
    }

    setCart({ ...newCart });
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = omit(cart, itemId);
    setCart(updatedCart);
  };

  const handleResetCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        onAddToCart: handleAddToCart,
        onRemoveFromCart: handleRemoveFromCart,
        onResetCart: handleResetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
