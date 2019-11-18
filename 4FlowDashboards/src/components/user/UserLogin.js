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
            let msg = document.getElementById('successMsg');
            if (msg.style.display === "none") {
                msg.style.display = "inline-flex";
            } else {
                msg.style.display = "none";
            }

            setInterval(function() {
                let input = document.getElementById('toogledInput');
                input.style.display = "none";
                msg.style.display = "none";
            }, 2000);
          }).catch(function(error) {
            let msg = document.getElementById('errorMsg');
            if (msg.style.display === "none") {
                msg.style.display = "inline-flex";
            } else {
                msg.style.display = "none";
            }

            setInterval(function() {
                let input = document.getElementById('toogledInput');
                input.style.display = "none";
                msg.style.display = "none";
            }, 2000);
          });          
    }

    function toogleResetPassword() {
        let input = document.getElementById('toogledInput');
        if (input.style.display === "none") {
            input.style.display = "inline-flex";
        } else {
            input.style.display = "none";
        }
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
                        <button className="btn btn-secondary btn-sm" style={{ fontSize: '14px' }} onClick={toogleResetPassword}>Forgot Password?</button>
                        <div id="toogledInput" className="row" style={{ marginTop: '15px', display: 'none' }}>
                            <div className="col-md-9">
                                <input className="form-control" id="mail" type="email" placeholder="Enter email"></input>
                            </div>
                            <div className="col-md-3">
                                <button style={{ marginLeft: '5px' }} className="btn btn-sm btn-primary" onClick={resetPassword}>
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div id="errorMsg" className="row" style={{ marginTop: '10px', display: 'none' }}>
                            <div className="col-md-12">
                                <p style={{ color: 'darkred' }}>The e-mail you submitted was not found!</p>
                            </div>
                        </div>
                        <div id="successMsg" className="row" style={{ marginTop: '10px', display: 'none' }}>
                            <div className="col-md-12">
                                <p style={{ color: 'darkgreen' }}>An e-mail to reset your password was send!</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLoginForm;
