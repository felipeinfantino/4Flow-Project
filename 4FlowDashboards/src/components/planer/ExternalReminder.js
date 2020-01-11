import React, {Component} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase/Firebase";

var db = firebase.firestore();


export class ExternalReminder extends Component {

    render() {
        return (
            <div id="contact-template">
                <div className="template-body">
                        <div className="row">
                          <h3>People Involved</h3>
                            <div className="col-md-6">
                                <div className="form-group" style={{ marginTop: '40px', marginLeft: '100px', width: '70%'}}>
                                    <div className="row">
                                        <label className="control-label" style={{ textAlign: 'left' }}><strong>Mail subject:</strong></label>
                                    </div>
                                    <div className="row">
                                        <input className="form-control" type="text" name="subject"></input>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <button type="btn" className="btn btn-primary btm-sm">Send</button>
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

export default ExternalReminder