import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import './ResetPassword.css';
import { get } from 'https';


export class ResetPassword extends Component {
    render() {
        return (
            <div id="ResetPassword">
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

export default ResetPassword
