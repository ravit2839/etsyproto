import CartPage from "../screens/cart";
import FavouritesScreen from "../screens/favourites";
import HomeScreen from "../screens/home";
import ItemScreen from "../screens/item";
import ItemCategoryScreen from "../screens/item-category";
import LoginScreen from "../screens/login";
import ProfileScreen from "../screens/profile";
import PurchasesScreen from "../screens/purchases";
import RegisterScreen from "../screens/register";
import ShopScreen from "../screens/shop";
import ShopNameScreen from "../screens/shop-name";
import ShopViewScreen from "../screens/shop-view";
import EditItemScreen from "../screens/edit-item";
const PUBLIC_ROUTES = [
  { path: "/login", Component: LoginScreen },
  { path: "/register", Component: RegisterScreen },
];

const PRIVATE_ROUTES = [
  { path: "/", Component: HomeScreen },
  { path: "/favs", Component: FavouritesScreen },
  { path: "/profile", Component: ProfileScreen },
  { path: "/init-shop", Component: ShopNameScreen },
  { path: "/shop", Component: ShopScreen },
  { path: "/shop/:shopId", Component: ShopViewScreen },
  { path: "/cart", Component: CartPage },
  { path: "/purchases", Component: PurchasesScreen },
  { path: "/item-category", Component: ItemCategoryScreen },
  { path: "/item/edit/:id", Component: EditItemScreen },
  { path: "/item/:id", Component: ItemScreen },
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
