import React, {Component} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase/Firebase";
import axios from "axios";
// const cryptoRandomString = require('crypto-random-string');
var db =  firebase.firestore();

export class SupplierContact extends Component {
    state = {
        startDate: new Date()
      };
    
    
      handleChange = date => {
        this.setState({
          startDate: date
        });
      };
      handleSubmit = (event) => {
        event.preventDefault();
        //let suppliersCheckBox = document.getElementsByName('suppliers[]');
        let date = document.getElementsByName('datepicker')[0].value;
        let type = document.getElementsByName('contract_type')[0].value;
        let subject = document.getElementsByName('subject')[0].value;
        let body = document.getElementsByName('mailBody')[0].value;
        let tid = 'taskID';

        let suppliers = ['google', 'amazon']
        
        //console.log(suppliers)
        /*suppliersCheckBox.forEach((element) => {
            if (element.checked) {
                suppliers.push(element.value);
            }
        });*/
        
        suppliers.forEach(supplier => {
            // var newKey = cryptoRandomString({length: 20});

            var data = {
                customerID:
                    {
                        mail: supplier,
                        date: date,
                        type: type,
                        subject: subject,
                        body: body
                    }
            };

            console.log(data)

            //Aufträge=>TaskID=>CustomerID=>Data
            db.collection("Aufträge").doc(tid).set(data).then(function (response) {
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
                    text: body
                })
            }).then(function (response) {
                console.log(response)
            });
        });
      }
    
    render() {
        return (
            <div id="contact-template">
                <div className="template-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-3">
                                
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
                                            name="datepicker"
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
                                            <button type="submit" className="btn btn-primary btm-sm">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SupplierContact