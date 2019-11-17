import firebase from "../firebase/Firebase";
import React, {useContext} from "react";
import {Redirect} from "react-router";
import {AuthContext} from "../auth/Auth";
import {Form, Row, Col, Button, Container} from 'react-bootstrap';
import './Login.css';

const UserLoginForm = () => {
    const {currentUser} = useContext(AuthContext);

    const handleLogin = (event) => {
        event.preventDefault();
        // const {email, password} = event.target.elements;
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword("amostuproject@gmail.com", "password");

        } catch (error) {
            alert(error);
        }
    };

    function resetPassword() {
        let mail = document.getElementById('mail').value ;
        
        return firebase.auth().sendPasswordResetEmail(mail).then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });          
    }

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        //layout starts
        <Container>
            <Row>
                <Col md={{span: 4, offset: 4}}>
                    <div className="login-form-wrapper">
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" className="fadeIn second"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" className="fadeIn third"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out"/>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="fadeIn fourth">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className="formFooter">
                        <p style={{ fontSize: '14px' }}>Forgot Password?</p>
                        <div className="row" style={{ marginTop: '10px' }}>
                            <div className="col-md-9">
                                <input className="form-control" id="mail" type="email" placeholder="Enter email"></input>
                            </div>
                            <div className="col-md-3">
                                <button style={{ marginLeft: '5px' }} className="btn btn-sm btn-secondary" onClick={resetPassword}>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLoginForm;
