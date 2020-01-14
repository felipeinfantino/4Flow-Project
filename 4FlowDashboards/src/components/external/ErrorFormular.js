import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import './ErrorFormular.css'


const initialState = {
    typeOfProblem : "",
    planer : "",
    mailBody : ""
};



class ErrorFormular extends Component{
    state = {...initialState};


    selectProblem = (e, object) => {
        //this.state.typeOfProblem = e.target.value
        this.setState({typeOfProblem: e.target.value})
        
    }

    selectPlaner = (e, object) => {
        this.setState({planer: e.target.value})
        //console.log(e)
    }

    updateTextBody = (e) => {
        console.log(e.target.value)
        this.setState({mailBody: e.target.value})
    }


    printState = () => {
        if(this.state.typeOfProblem == "" || this.state.planer == ""  || this.state.mailBody == ""){
            return 
        }else{
            console.log(this.state);
            //this.setState({typeOfProblem: "", planer: "", mailBody: ""})
            this.setState({...initialState});
            //this.setState({mailBody: "success"})
           
        }

    }

   
    render(){

        return(
        <Form className="form-problem">
            <Form.Group controlId="exampleForm.ControlSelect1" className="problem-select" >
                <Form.Label>Select type of problem</Form.Label>
                <Form.Control as="select"  onChange={this.selectProblem}>
                <option selected="true" disabled="disabled">Select</option>
                <option>Production Problems</option>
                <option>Delay in delivery</option>
                <option>Insufficient time</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2" className="planer-select" >
                <Form.Label>Choose planer</Form.Label>
                <Form.Control as="select"  onChange={this.selectPlaner}>
                <option selected="true" disabled="disabled">Select</option>
                <option>Planer1</option>
                <option>Planer2</option>
                <option>Planer3</option>
                <option>Planer4</option>
                <option>Planer5</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1" className="textfield-problem" onChange={this.updateTextBody}>
                <Form.Label>Describe your problem</Form.Label>
                <Form.Control as="textarea" placeholder="Your text here..." rows="10" />
            </Form.Group>
            <Button variant="primary"  onClick={this.printState}>
                Send
            </Button>
        </Form>

        )
    }
}


export default ErrorFormular;