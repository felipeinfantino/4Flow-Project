import firebase from "../firebase/Firebase";
import React, {useContext, useState} from "react";
import {AuthContext} from "../auth/Auth";
import {withRouter} from 'react-router-dom';
import Login from './Login';
import './Login.css';

const LoginContainer = (props) => {

    const {dispatch} = useContext(AuthContext);

    const initialState = {
        email: "",
        password: "",
    };

    const [data, setData] = useState(initialState);
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();

        return firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(userCredential => {
            getRoleAndRedirect(userCredential.user)
        }).catch(function () {
            let msg = document.getElementById('loginMsg');
            if (msg.style.display === "none") {
                msg.style.display = "inline-flex";
            } else {
                msg.style.display = "none";
            }

            setInterval(function () {
                msg.style.display = "none";
            }, 2000);
        });
    };

    function resetPassword() {
        let mail = document.getElementById('mail').value;

        return firebase.auth().sendPasswordResetEmail(mail).then(function () {
            let msg = document.getElementById('successMsg');
            if (msg.style.display === "none") {
                msg.style.display = "inline-flex";
            } else {
                msg.style.display = "none";
            }

            setInterval(function () {
                let input = document.getElementById('toogledInput');
                input.style.display = "none";
                msg.style.display = "none";
            }, 2000);
        }).catch(function () {
            let msg = document.getElementById('errorMsg');
            if (msg.style.display === "none") {
                msg.style.display = "inline-flex";
            } else {
                msg.style.display = "none";
            }

            setInterval(function () {
                let input = document.getElementById('toogledInput');
                input.style.display = "none";
                msg.style.display = "none";
            }, 2000);
        });
    }

    function toggleResetPassword() {
        let input = document.getElementById('toogledInput');
        if (input.style.display === "none") {
            input.style.display = "inline-flex";
        } else {
            input.style.display = "none";
        }
    }

    const getRoleAndRedirect = (currentUser) => {
        let user = {...currentUser};
        let role = null;
        firebase.database().ref('/users/' + currentUser.uid).once('value').then(function (snapshot) {
            role = (snapshot.val() && snapshot.val().userRole) || 'Anonymous';
            if (snapshot.val() !== null) {
                user.role = role;
                dispatch({
                    type: "LOGIN",
                    payload: user
                });
                props.history.push("/")
            }
        });
    };

    let functions = [
        handleLogin,
        handleInputChange,
        toggleResetPassword,
        resetPassword
    ];

    return (
        <Login functions={functions} data={data}/>
    );
};

export default withRouter(LoginContainer);