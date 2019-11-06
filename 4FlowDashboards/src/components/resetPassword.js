import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import '../resetPassword.css';
import firebase from '../Firebase'
import {AuthContext} from '../Auth'
import { get } from 'https';


export class resetPassword extends Component {

    render() {
        return (
            <div id="resetPassword">
                <Form>
                    <Form.Group style={ { margin: '30px'} }>
                        <Form.Label>Enter your email address and we will send you the instructions for resetting your password</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Enter email address" />
                        <br></br>
                        <button style={{marginRight: '10px', backgroundColor: '#007bff'}} type="submit" className="btn btn-success">Send</button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default resetPassword
