import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import HomeScreen from "../screens/home";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes-list";

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomeScreen />
      </Route>

      {PUBLIC_ROUTES.map((route) => (
        <Route key={route.path} path={route.path}>
          <route.Component />
        </Route>
      ))}

      {PRIVATE_ROUTES.map((route) => (
        <Route key={route.path} path={route.path}>
          <route.Component />
        </Route>
      ))}
    </Switch>
  );
}
