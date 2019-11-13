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
                        <a className="forget-password" href="/reset-password">Forgot Password?</a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLoginForm;
