import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "./Auth";

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {state} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps => state.isAuthenticated
                ? (<RouteComponent {...routeProps} />)
                : (<Redirect to={"/login"}/>)
            }
        />
    );
};


export default PrivateRoute