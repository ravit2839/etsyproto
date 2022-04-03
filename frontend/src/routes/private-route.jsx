import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = window.localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return <RedirectToLogin {...props} />;

        return <Component {...props} />;
      }}
    />
  );
}

function RedirectToLogin({ ...props }) {
  return (
    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
  );
}
