import React from 'react';
import {Form, Grid, Row, Col, Button, Container} from 'react-bootstrap';
import '../Login.css';

class UserLoginForm extends React.Component {
  render() {
    return (
      //layout starts
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <div className="login-form-wrapper">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" className="fadeIn second"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" className="fadeIn third" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" className="fadeIn fourth">
                  Submit
                </Button>
              </Form>
            </div>
            <div className="formFooter">
              <a className="forget-password" href="#">Forgot Password?</a>
            </div>
          </Col>
        </Row>
      </Container>
      );
  }
}

export default UserLoginForm;
