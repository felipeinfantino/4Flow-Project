import React, {useState, useEffect, Component} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase/Firebase";
import Grid from "./Grid";
import Form from "./Form";


function useDbData(){

    const [dbData, setDbData] = useState([]);
    useEffect(() => {
        firebase.firestore().collection('Users').doc('User-Data').onSnapshot((snapshot) =>{
            const val = snapshot.data();   
            const newDbData = Object.keys(val).map((keyName) => (
                 val[keyName]
            ))
             setDbData(newDbData);
        })
    }, []);
    return dbData;
}

function ExternalReminder() {
    const dbData = useDbData();
   
        return (
            <div>
                <div id="contact-template">
                <div className="template-body">
                            <div className="row">
                              <h3>People Involved</h3>
                              <div className="col-md-6">
                                <h5>List of people involved in the task</h5>
                                <ul>
                                  {dbData.map((doc) =>{
                                        return <li>{doc.email}</li>
                                })}
                                </ul>
                              </div>
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
            </div>
        );
}


export default ExternalReminder;