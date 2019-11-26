import React, { Component } from 'react';
import firebase from "../firebase/Firebase";
import {Redirect} from "react-router";
var db =  firebase.firestore();

 var states = { 
            Email:'BLUB',
            Route:'',
            Subject:''
    };

function setStates(email){
    states.Email=email
}

class emailResp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Email : 'Test'
      };
      this.handleSubmit = this.handleSubmit.bind(this)
    }

  handleSubmit = (e) => {
        //get URL
        e.preventDefault();
        var url = window.location.href
        //split the url
        var splittedURL = url.split("?")
        //get all substrings containing the IDs
        var CIDstr = splittedURL[1];
        var TIDstr = splittedURL[2];
        var PIDstr = splittedURL[3];
        //get customer id
        CIDstr = CIDstr.split("=");
        var CID = CIDstr[1];
        //get task id
        TIDstr = TIDstr.split("=");
        var TID = TIDstr[1];
        //get planer id
        PIDstr = PIDstr.split("=");
        var PID = PIDstr[1];
        db.collection("Aufträge").doc(TID).get().then(function(doc) {
            if (doc.exists) {
                setStates(doc.get(CID).Email);
                this.state.Email = "ADSA"
                e.preventDefault();
            } else {
                e.preventDefault();
                console.log("No such document!");
                
            }
            
        }).catch(function(error) {
            e.preventDefault();
            console.log("Error getting document:", error);
            
        });


      e.preventDefault();
  
    }

   
    render(){
        console.log(states.Email)
        return (
            <div>
            
            <form onSubmit={e => this.handleSubmit()} id="emailForm">
                
                <button type="submit" className="btn btn-primary submit-button">Load Data</button>
            </form>
             <div>   
                {states.Email}
            </div>
            </div>
        )
    
    
    }
}

export default emailResp;