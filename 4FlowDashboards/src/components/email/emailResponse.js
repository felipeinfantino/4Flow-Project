import React from 'react';
import firebase from "../firebase/Firebase";
var db =  firebase.firestore();

class emailResp extends React.Component {
    cid;
    pid;
    tid;
    constructor(props) {
      super(props);
      this.state = {
        Email : 'Loading'
      };
    let { cid, pid, tid } = this.props.match.params;
    this.cid = cid;
    this.pid = pid;
    this.tid = tid;
    }

    componentDidMount(){
        db.collection("Aufträge").doc(this.tid).get().then((doc) => {
            if (doc.exists) {
                console.log("state changed");
                // TODO daten richtig holen
                const data = doc.data;
                console.log(data);
                const resutl = this.cid + " pid : " + this.pid + " tid : " + this.tid;
                this.setState({Email: "Changed the cid " + resutl})
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            
    });
    }

       
    render(){
        console.log(this.state.Email)
        return (
            <div>
             <div>
                 {this.state.Email}   
            </div>
            </div>
        )
    
    
    }
}

export default emailResp;