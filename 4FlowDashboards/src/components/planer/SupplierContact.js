import React, {Component} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase/Firebase";

var db = firebase.firestore();


export class SupplierContact extends Component {
    state = {
        startDate: new Date(),
      };
     
      handleChange = date => {
        this.setState({
          startDate: date
        });
      };

      componentDidMount(){
          const passedState = this.props.location.state;
          console.log(passedState)
          if(!passedState){
              alert("Pass the companies you want to contact, subtaskId and todoId");
              this.props.history.push("/planer");
          }
          if(!this.props.location.state.companiesToContact){
            alert("Pass the companies you want to contact");
              this.props.history.push("/planer");
          }
          if(!this.props.location.state.subTaskId){
            alert("Pass the subtaskId");
            this.props.history.push("/planer");
          }
          if(!this.props.location.state.todoId){
            alert("Pass the todoId");
            this.props.history.push("/planer");
          }

        this.setState({companiesToContact: this.props.location.state.companiesToContact, subTaskId: this.props.location.state.subTaskId, todoId: this.props.location.state.todoId });
          
      }

    broadcastEmail = async () => {
        console.log("in broadcast")
        let companies =  this.state.companiesToContact.map((company) => company.companyName);
        let date = document.getElementsByName('datepicker')[0].value;
        let type = document.getElementsByName('contract_type')[0].value;
        let subject = document.getElementsByName('subject')[0].value;
        let mailBody = document.getElementsByName('mailBody')[0].value;

        companies.forEach(company => {

            var data = {
                customerID:
                {
                    mail: company,
                    date: date,
                    type: type,
                    subject: subject,
                    body: mailBody
                }
            };

            db.collection("Aufträge").doc().set(data).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });

            fetch('http://localhost:3001/email', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    destinations: ["test@gmail.com"],
                    subject: subject,
                    text: mailBody
                })
            }).then(function (response) {
                console.log(response)
            });

            
        });

        return companies
    }

    goBack = async () => {
        try{
            const contactedCompanies = await this.broadcastEmail();
            console.log(contactedCompanies);
            alert("Email successfully sent");
            console.log("here i",this.state.subTaskId);
            console.log("here a",this.state.todoId);
            this.props.history.push("/collectdata", {contactedCompanies : contactedCompanies, subTaskId: this.state.subTaskId, todoId: this.state.todoId });
        }catch(e){
            console.log(e);
            alert("Somenthing went wrong try again please");
            this.props.history.push("/collectdata");
        }   
      }
    
    
    render() {
        return (
            <div id="contact-template">
                <div className="template-body">
                        <div className="row">
                            <div className="col-md-3">
                            <div >
                            <label className="control-label"><strong>Companies to contact</strong></label>
                            <div >
                                {this.state.companiesToContact ? this.state.companiesToContact.map(company => {
                                    return (
                                        <div style={{ border: "1px solid grey", margin: "10px", backgroundColor: "lightGrey" }}>
                                            <p>{company.companyName}</p>
                                            <p>{company.email}</p>
                                        </div>
                                    )
                                }) : '' }

                            </div>

                            </div>
                            </div> 
                            <div className="col-md-3">
                                <div className="form-group" style={{ textAlign: 'left', marginTop: '40px' }}>
                                    <div className="row">
                                        <label className="control-label"><strong>Date and Time:</strong></label>
                                    </div>
                                    <div className="row">
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            timeCaption="time"
                                            dateFormat="d.M.Y h:mm aa"
                                            className="form-control"
                                            name = "datepicker"
                                        />
                                    </div>
                                    <div className="row" style={{ marginTop: '20px' }}>
                                        <label className="control-label"><strong>Contract type:</strong></label>
                                    </div>
                                    <div className="row">
                                        <select className="form-control" name="contract_type">
                                            <option>Type 1</option>
                                            <option>Type 2</option>
                                            <option>Type 3</option>
                                            <option>Type 4</option>
                                            <option>Type 5</option>
                                            <option>Type 6</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group" style={{ marginTop: '40px', marginLeft: '100px', width: '70%'}}>
                                    <div className="row">
                                        <label className="control-label" style={{ textAlign: 'left' }}><strong>Mail subject:</strong></label>
                                    </div>
                                    <div className="row">
                                        <input className="form-control" type="text" name="subject"></input>
                                    </div>
                                    <div className="row" style={{ marginTop: '20px' }}>
                                        <label className="control-label" style={{ textAlign: 'left' }}><strong>Content:</strong></label>
                                        <textarea name="mailBody" className="form-control rounded" rows="15"></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <button type="btn" className="btn btn-primary btm-sm" onClick={this.goBack}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default SupplierContact