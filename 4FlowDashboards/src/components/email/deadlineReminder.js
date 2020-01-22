import React from 'react';
import firebase from "../firebase/Firebase";
import {Redirect} from "react-router";
var db =  firebase.firestore();

var list = []

function getData(){
    var currentDateInHours = Date.now()/(1000*60*60);
        var oneDay = 24;
        db.collection("PlanerTasks").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            if (typeof(doc.get('deadline')) !== 'undefined'){
                var hours = Date.parse(doc.get('deadline').toDate())/(1000*60*60);
                if(hours-currentDateInHours <= oneDay && hours-currentDateInHours > 0){
                    list.push(doc.id);
                }
                
            }
        });
    });   

}
   function sendEmail (){

         /*return fetch('http://localhost:3001/email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                destinations: ["amostuproject@gmail.com"],
                subject: "Deadline-Reminder",
                text: list.join()
            })
        })*/
        try{
            fetch('http://localhost:3001/email', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    destinations: ["amostuproject@gmail.com"],
                    subject: "Internal Reminder",
                    text: list.join()
                })
    });
    alert("Email successfully sent");
        }catch(e){
            console.log("error ", e);
        }
    }

function deadlineRem(){
        getData()
        return (
            <div>
                <form id="emailForm">
                    <div>
                        <button type="submit" className="btn btn-primary submit-button" onClick={sendEmail}>Send</button>
                    </div>
                </form>
            </div>
        )
    
    
    
}

export default deadlineRem;