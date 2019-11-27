import React from 'react';
import firebase from "../firebase/Firebase";
import {Redirect} from "react-router";
var db =  firebase.firestore();
//http://localhost:3000/email/884545fafad56as4d321/nfcveePOnNY4Ds3bD9Ss/wcW9F0icYsT8BDj8U91BFi5pqMr2
//http://localhost:3000/email/dhuiaszdiaudnk4545645/nfcveePOnNY4Ds3bD9Ss/wcW9F0icYsT8BDj8U91BFi5pqMr2
//http://localhost:3000/email/iweruwehiaioggf556646/qZVqYvyzvN3UWCEaw4ig/wcW9F0icYsT8BDj8U91BFi5pqMr2
class emailResp extends React.Component {
    cid;
    pid;
    tid;
    status;
    constructor(props) {
      super(props);
      this.state = {
        Email : 'Loading Email....',
        Subject : 'Loading Subject....',
        Route : 'Loading Route....'
      };
    let { cid, tid, pid } = this.props.match.params;
    this.cid = cid;
    this.pid = pid;
    this.tid = tid;
    this.status = 0//0:none, 1: someone has accepted the task
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let input = document.getElementById('optionalInput').value;
        console.log(input);
        var planerRef = db.collection("Planer").doc(this.pid);
        const updateForm = "Aufträge"+"."+this.tid+"."+this.cid+"."+"TaskStatus"
        var planersUpdate = {};
        planersUpdate[`Aufträge.${this.tid}.${this.cid}.TaskStatus`] = input;
        planerRef.update(planersUpdate)
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    
    getStatus(){
        db.collection("Planer").doc(this.pid).get().then((doc) => {
            if (doc.exists) {
                var tasks = ((doc.get('Aufträge')[this.tid]))
                var keys = Object.keys(tasks);
                for (var i = 0; i < keys.length; i++){
                    if(tasks[keys[i]].TaskStatus == 'Accept'){
                        this.status = 1;
                        break;
                    }
                }
            } else {
                //Document doesn't exist
                console.log("No such document!");
            }
        }).catch(function(error) {
            //Error
            console.log("Error getting document:", error);
            
        });
    }

    componentDidMount(){
        this.getStatus();
        db.collection("Aufträge").doc(this.tid).get().then((doc) => {
            if (doc.exists) {
                //Get the values from Cloud Firestore Database
                const emailRes = doc.get(this.cid).Email;
                const subjectRes = doc.get(this.cid).Subject;
                const routeRes = doc.get(this.cid).Route;
                //Store them
                const data = {
                    Email: emailRes,
                    Subject: subjectRes,
                    Route : routeRes
                }
                //Update the state to render them
                this.setState(data)
            } else {
                //Document doesn't exist
                console.log("No such document!");
            }
        }).catch(function(error) {
            //Error
            console.log("Error getting document:", error);
            
        });
    }

       
    render(){
        if(this.status ==1){
            return <Redirect to='/emailNoAccess'/>
        }
        return (
            <div>
                <div>
                    Subject: {this.state.Subject}  
                </div>
                <div>
                    Email: {this.state.Email}   
                </div>
                <div>
                    Route: {this.state.Route}  
                </div>
                <form onSubmit={this.handleSubmit} id="emailForm">
                    <select name='acceptDeclineButton' id = 'optionalInput'>
                        <option>Accept</option>
                        <option>Decline</option>
                    </select>
                    <div>
                        <button type="submit" className="btn btn-primary submit-button">Send</button>
                    </div>
                </form>
            </div>
        )
    
    
    }
}

export default emailResp;