import React from 'react';
import firebase from "../firebase/Firebase";
import {Redirect} from "react-router";
var db =  firebase.firestore();

var list = []
class deadlineRem extends React.Component {
    today;
    constructor(props) {
      super(props);
      this.state = {
        Email : 'Loading Email....',
        Subject : 'Loading Subject....',
        Route : 'Loading Route....'
      };
    this.today = 0;
    }

    componentDidMount(){
        var currentDateInHours = Date.now()/(1000*60*60);
        var oneDay = 24;
        db.collection("PlanerTasks").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            if (typeof(doc.get('deadline')) !== 'undefined'){
                var hours = Date.parse(doc.get('deadline').toDate())/(1000*60*60);
                if(hours-currentDateInHours <= oneDay){
                    list.push(doc.id);
                }
                
            }
        });
    });        
    }
    test(){
        alert("Hello World");
    }
    sendEmail = async () =>{

         return fetch('http://localhost:3001/email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                destinations: ["a.karojan1989@yahoo.de"],
                subject: "Deadline-Reminder",
                text: list.join()
            })
        })
    }
    send = async () => {
            try{
                const repo = await this.sendEmail();
                alert("Email successfully sent");
                console.log(repo);
            }catch(e){
                console.log(e);
                alert("Somenthing went wrong try again please");
            }   
    }

       
    render(){
        return (
            <div>
                <form id="emailForm">
                    <div>
                        <button type="submit" className="btn btn-primary submit-button" onClick={this.send}>Send</button>
                    </div>
                </form>
            </div>
        )
    
    
    }
}

export default deadlineRem;