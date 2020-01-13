import React, {Component} from 'react'
import {Form} from 'react-bootstrap'
class ErrorFormular extends Component{
    render(){
        return(
    <Form>

  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Categories</Form.Label>
    <Form.Control as="select">
      <option>Production prroblems</option>
      <option>Change date</option>
      <option>Transport takes more time</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Problem discription</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Select planer</Form.Label>
    <Form.Control as="select" >
      <option>Planer1</option>
      <option>Planer2</option>
      <option>Planer3</option>
      <option>Planer4</option>
      <option>Planer5</option>
    </Form.Control>
  </Form.Group>
</Form>
        )
    }
}


export default ErrorFormular;