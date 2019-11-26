import React from 'react';
import firebase from "../firebase/Firebase";
var db =  firebase.firestore();
//http://localhost:3000/email/884545fafad56as4d321/nfcveePOnNY4Ds3bD9Ss/wcW9F0icYsT8BDj8U91BFi5pqMr2
//http://localhost:3000/email/iweruwehiaioggf556646/qZVqYvyzvN3UWCEaw4ig/wcW9F0icYsT8BDj8U91BFi5pqMr2
class emailResp extends React.Component {
    cid;
    pid;
    tid;
    constructor(props) {
      super(props);
      this.state = {
        Email : 'Loading Email....',
        Subject : 'Loading Subject....',
        Route : 'Loading Route....'
      };
    let { cid, pid, tid } = this.props.match.params;
    this.cid = cid;
    this.pid = pid;
    this.tid = tid;
    }

    componentDidMount(){
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
            </div>
        )
    
    
    }
}

export default emailResp;