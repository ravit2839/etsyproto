import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import PrivateRoute from "./private-route";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes-list";

export default function AppRoutes() {
  return (
    <Switch>
      {PUBLIC_ROUTES.map((route) => (
        <Route key={route.path} path={route.path}>
          <route.Component />
        </Route>
      ))}

      {PRIVATE_ROUTES.map((route) => (
        <PrivateRoute
          exact
          key={route.path}
          path={route.path}
          component={route.Component}
        />
      ))}
    </Switch>
  );
}
