import React, { Component } from 'react'
import { Form, Alert } from 'react-bootstrap';
import '../resetPassword.css';
import {AuthContext} from "../../Auth";
import firebase from "../../Firebase";
import '../../resetPassword.css'

const resetPassword = () => {
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
        <div id="resetPassword">
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

export default resetPassword
