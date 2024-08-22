import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        // true ?(
        <Component {...props} />
      ) : (
        <Redirect to={`/auth/login`} />
        // <Component {...props} />
      )
    }
  />
);

export default PrivateRoute;