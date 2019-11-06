import React from "react";
import firebase from "../../Firebase";
import {Redirect} from "react-router";

const Logout = () => {
    firebase.auth().signOut();

    return <Redirect to="/login"/>;
};

export default Logout;