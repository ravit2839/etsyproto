import CartPage from "../screens/cart.jsx";
import { render, screen, fireEvent } from "@testing-library/react";
import React, { useNavigate } from "react";
import "@testing-library/jest-dom";

test("Checks for Cart ", () => {
  render(<CartPage />);
  const shopName = screen.getByText(/cart/);
  expect(shopName).toBeInTheDocument();
});