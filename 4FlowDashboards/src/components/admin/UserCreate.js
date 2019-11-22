import React, {Component} from "react";
import './UserCreate.css'
import firebase from "../firebase/Firebase";
import { Redirect } from 'react-router-dom'
var dir = false;


function writeUserData(email, passW,role,userID) {
    return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
        if (snapshot.val() !== null) {
            alert("Username already exists, please choose another username");
        }else{
            //alert("doesnt exists")
            writeUserDataHelp(email, passW,role,userID);
            dir = true;
            firebase.auth().signOut();

        }
    });
}


function writeUserDataHelp(email, passW,role,userID) {

    firebase.database().ref('users/'+userID).set({
        email: email,
        password: passW,
        userRole:role,
    });
}
class UserCreate extends Component{
     constructor(props) {
        super(props);
        this.state = {
            email: ' ',
            username: '',
            role : 'External'
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
            role: this.state.role
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.userpassword)
        .then(data=>{
            console.log('Signup successful.');
            this.setState({
                    response: 'Account Created!'
                })
            writeUserData(myForm.email, myForm.userpassword,myForm.role,data.user.uid)
            firebase.auth().signOut();

           })
        .catch((error)=> {
            alert(error.message)
          });

        //writeUserData(myForm.email, myForm.userpassword,myForm.role,myForm.username);
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