import React, {useContext} from "react";
import firebase from "../firebase/Firebase";
import {Redirect} from "react-router";
import {AuthContext} from "../auth/Auth";

const Logout = () => {
    const {dispatch} = useContext(AuthContext);

    firebase.auth().signOut().then(
        dispatch({
            type: "LOGOUT",
            payload: null
        })
    );

    return <Redirect to="/login"/>;
};

export default Logout;