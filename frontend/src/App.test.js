// // import { Navbar } from "../src/components/index.jsx";
// import CartPage from "./screens/cart";
// import { render, screen} from "@testing-library/react";

// import "@testing-library/jest-dom";
// import {  BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import HomeScreen from "./screens/home";
import FavouritesScreen from "./screens/favourites";
// test("testing ", () => {
//   render(
//     <Router>
//   <FavouritesScreen/>
//   </Router>
//   );
//   const shopName = screen.getByText(/favs/);
//   expect(shopName).toBeInTheDocument();
// });

import { getAllByLabelText, render, screen } from '@testing-library/react';
import AppFooter from './components/footer';
import HomeScreen from './screens/home';
import AppNavbar from "./components/navbar";
import LoginScreen from "./screens/login";
// import {screen } from '@testing-library/dom'
import {getByLabelText} from '@testing-library/dom'

// import {render, screen} from '@testing-library/react' // (or /dom, /vue, ...)

test('Favourites Page Te ', () => {
  render(<LoginScreen />);
  const input = screen.getByText('Sigin')
  expect(input).toBeInTheDocument();
});