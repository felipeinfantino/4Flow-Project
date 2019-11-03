import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import '../ChangePasswordModal.css';
import { get } from 'https';


export class ChangePasswordModal extends Component {
    render() {
        return (
            <div id="changePasswordModal">
                <Form>
                    <Form.Group style={ this.getGroupStyle() }>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="text" name="password" placeholder="Enter new password" />
                        <br></br>
                        <Form.Label>Confirm new Password</Form.Label>
                        <Form.Control type="text" name="password-confirmation" placeholder="Confirm new password" />
                        <br></br>
                        <button style={this.getButtonStyle()} type="submit" className="btn btn-success">Save</button>
                        <a className="btn btn-danger" href="/">Cancel</a>
                    </Form.Group>
                </Form>
            </div>
        );
    }
    getButtonStyle = () => {
        return {
          marginRight: '10px',
        }
    }
    getGroupStyle = () => {
        return {
          margin: '30px',
        }
    }
}

export default ChangePasswordModal
