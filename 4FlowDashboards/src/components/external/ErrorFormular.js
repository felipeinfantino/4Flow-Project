import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import './ErrorFormular.css'
class ErrorFormular extends Component{
    render(){
        return(
        <Form className="form-problem">
            <Form.Group controlId="exampleForm.ControlSelect1" className="problem-select">
                <Form.Label>Select type of problem</Form.Label>
                <Form.Control as="select">
                <option>Production Problems</option>
                <option>Delay in delivery</option>
                <option>insufficient time</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2" className="planer-select">
                <Form.Label>Choose planer</Form.Label>
                <Form.Control as="select" >
                <option>Planer1</option>
                <option>Planer2</option>
                <option>Planer3</option>
                <option>Planer4</option>
                <option>Planer5</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1" className="textfield-problem">
                <Form.Label>Describe your problem</Form.Label>
                <Form.Control as="textarea" placeholder="Your text here..." rows="10" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Send
            </Button>
        </Form>

        )
    }
}


export default ErrorFormular;