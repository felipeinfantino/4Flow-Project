import React, {useState, useEffect, Component} from 'react';
import './external-reminder.css';
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

async function send (){
    const dbData = ["amostuproject@gmail.com", "amostuproject@gmail.com"]
    let input = document.getElementById('optionalInput').value;
    
    try {
      const response = await fetch("http://localhost:3001/email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          destinations: dbData,
          subject: input,
          text: "External-Reminder"
        })
      });
      alert("Email successfully sent");
    } catch (e) {
      console.log("error ", e);
    }
}
function ExternalReminder() {
    const dbData = useDbData();
   
        return (
            <div>
                <div id="contact-template">
                <div className="template-body">
                            <div className="row row-content">
                                <div className="heading">
                                    <h3>People Involved</h3>
                                </div>
                              <div className="col-md-12 column-content">
                                <h5>List of people involved in the task</h5>
                                <ul>
                                  {dbData.map((doc,index) =>{
                                        return <li key = {index}>{doc.email}</li>
                                })}
                                </ul>
                              </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="row">
                                            <label className="control-label" style={{ textAlign: 'left' }}><strong>Mail subject:</strong></label>
                                        </div>
                                        <div className="row">
                                            <input className="form-control" type="text" name="subject"  id = 'optionalInput'></input>
                                            <button type="btn" className="btn btn-primary btm-sm" onClick={() => send()}>Send</button>
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