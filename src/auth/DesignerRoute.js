import React from "react"
import {Route,Redirect} from "react-router-dom";
import { isAuthenticated } from "./index";

const DesignerRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 2 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
  
  export default DesignerRoute;