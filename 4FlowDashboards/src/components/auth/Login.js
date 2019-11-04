import firebase from "../../Firebase";
import React, {useContext} from "react";
import {Redirect} from "react-router";
import {AuthContext} from "../../Auth";


// Call this to login a user
// firebase.auth().signInWithEmailAndPassword(email, password);

const Login = () => {

    //To be implemented
    const handleLogin = () => {};

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email"/>
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password"/>
                </label>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default Login;