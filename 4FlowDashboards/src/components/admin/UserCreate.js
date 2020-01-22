import React, {Component} from "react";
import './UserCreate.css'
import firebase from "../firebase/Firebase";
var dir = false;
var db =  firebase.firestore();

function writeUserData(email, passW,role,company,userID) {
    var objData = {};
    objData[userID] = new Object(userID);
    objData[userID]= {
        email: email,
        password: passW,
        company: company,
        userRole: role
    };
    var userRef = db.collection("Users").doc("User-Data");
    userRef.update(objData).then(function() {
        console.log("Document successfully updated!");
    }).catch(function (error) {
        console.error("Error updating document: ", error);
    });
}

class UserCreate extends Component{
     constructor(props) {
        super(props);
        this.state = {
            email: '',
            userpassword: '',
            role : 'External',
            company: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        const myForm = {
            email: this.state.email,
            userpassword: this.state.userpassword,
            role: this.state.role,
            company: this.state.company

        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.userpassword)
        .then(data=>{
            console.log('Signup successful.');
            writeUserData(myForm.email, myForm.userpassword,myForm.role,myForm.company,data.user.uid)
           })
        .catch((error)=> {
            alert(error.message)
          });

        if(dir === true){
            dir = false;
        }else{
            dir = false;
            e.preventDefault();
        }
    }
    render(){
        return(
            <div id="createUserForm">
                <form onSubmit={this.handleSubmit} id="emailForm">
                    <div className="form-group">
                        <label htmlFor="companyInput">Company</label>
                        <input 
                            name='company'
                            value={this.state.company}
                            onChange={e => this.handleChange(e)} 
                            type="text" 
                            className="form-control" 
                            id="companyInput" 
                            placeholder="Enter your company name">
                        </input>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailInput">Email</label>
                        <input 
                            name='email'
                            value={this.state.email}
                            onChange={e => this.handleChange(e)} 
                            type="email" 
                            className="form-control" 
                            id="usernameInput" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter your email">
                        </input>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                        name='userpassword'
                        value={this.state.userpassword} 
                        defaultValue={this.state.value}
                        onChange={e => this.handleChange(e)} 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" />
                    </div>
                    <p>Role</p>
                    <select name='role'
                        value={this.state.role} 
                        onChange={e => this.handleChange(e)} 
                        className="form-control form-control-sm">
                        
                        <option>External</option>
                        <option>Planer</option>
                        <option>Balancer</option>

                    </select>
                
                    <button type="submit" className="btn btn-primary submit-button">Submit</button>
                </form>
            </div>
        );
    }
}


export default UserCreate;