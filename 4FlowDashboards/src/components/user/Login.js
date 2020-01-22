import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import '../../assets/styles/common.css';

const Login = (props) => {
    const [handleLogin, handleInputChange, toggleResetPassword, resetPassword] = props.functions;
    return (
        <Container>
            <Row>
                <Col md={{span: 4, offset: 4}}>
                    <div className="login-form-wrapper">
                        <div id="loginMsg" className="row" style={{marginTop: '10px', display: 'none'}}>
                            <div className="col-md-12">
                                <p style={{color: 'darkred'}}>Credentials could not been found. Please re-enter a valid
                                    e-mail and password.</p>
                            </div>
                        </div>
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control value={props.data.email}
                                              onChange={handleInputChange}
                                              name="email"
                                              type="email"
                                              placeholder="Enter email"
                                              className="fadeIn second"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control value={props.data.password}
                                              onChange={handleInputChange}
                                              name="password"
                                              type="password"
                                              placeholder="Password"
                                              className="fadeIn third"/>
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
                        <button className="btn btn-secondary btn-sm" style={{fontSize: '14px'}}
                                onClick={toggleResetPassword}>Forgot Password?
                        </button>
                        <div id="toogledInput" className="row" style={{marginTop: '15px', display: 'none'}}>
                            <div className="col-md-9">
                                <input className="form-control" id="mail" type="email"
                                       placeholder="Enter email"/>
                            </div>
                            <div className="col-md-3">
                                <button style={{marginLeft: '5px'}} className="btn btn-sm btn-primary"
                                        onClick={resetPassword}>
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div id="errorMsg" className="row" style={{marginTop: '10px', display: 'none'}}>
                            <div className="col-md-12">
                                <p style={{color: 'darkred'}}>The e-mail you submitted was not found!</p>
                            </div>
                        </div>
                        <div id="successMsg" className="row" style={{marginTop: '10px', display: 'none'}}>
                            <div className="col-md-12">
                                <p style={{color: 'darkgreen'}}>An e-mail to reset your password was send!</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;