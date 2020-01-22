import React, {useContext} from "react";
import { Form } from 'react-bootstrap';
import './ResetPassword.css';
import firebase from "../firebase/Firebase";
import {AuthContext} from "../auth/Auth";
import { get } from 'https';
import '../../assets/styles/common.css';




const ResetPassword = () => {

    const {currentUser} = useContext(AuthContext);
    const resetPasswordSubmit = () => {
        console.log("Used")
        //----------
        let user = firebase.auth().currentUser;
        let emailAddress = user.email;

        firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        console.log('Email sent');
        }).catch(function(error) {
        // An error happened.
        console.log('An error occued');
        });

        //---------
    };

    return (
        <div id="ResetPassword">
            <Form onSubmit={resetPasswordSubmit}>
                <Form.Group style={ { margin: '30px'} }>
                    <Form.Label>Enter your email address and we will send you the instructions for resetting your password</Form.Label>
                    <Form.Control type="text" name="email" placeholder="Enter email address" />
                    <br></br>
                    <button style={{marginRight: '10px', backgroundColor: '#007bff'}} type="submit" className="btn btn-success">Send</button>
                </Form.Group>
            </Form>
        </div>
    );
};


export default ResetPassword
