import React, {Component} from "react";
import './UserCreate.css'
import firebase from "../firebase/Firebase";
import { Redirect } from 'react-router-dom'
var dir = false;


function writeUserData(email, passW,role,username) {
    return firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
        if (snapshot.val() !== null) {
            alert("Username already exists, please choose another username");
        }else{
            //alert("doesnt exists")
            writeUserDataHelp(email, passW,role,username);
            dir = true;
            firebase.auth().signOut();
        
        }
    });
}

function writeUserDataHelp(email, passW,role,username) {

    firebase.database().ref('users/'+username).set({
        email: email,
        username: username,
        password: passW,
        userRole:role,
    });
    return 0;
}

function readUserData(name){
return firebase.database().ref('/users/' + name).once('value').then(function(snapshot) {
  var email = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  if (snapshot.val() !== null) {
        alert("Your email is: "+name)
      }else{
        alert("Username does not exist")
      }
});

}

class UserCreate extends Component{
     constructor(props) {
        super(props);
        this.state = {
            email: ' ',
            username: '',
            userpassword: ' ',
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
            username: this.state.username,
            userpassword: this.state.userpassword,
            role: this.state.role
        }
        writeUserData(myForm.email, myForm.userpassword,myForm.role,myForm.username);
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
                        <label htmlFor="usernameInput">Username</label>
                        <input 
                        name='username'
                        value={this.state.username} 
                        defaultValue={this.state.value}
                        onChange={e => this.handleChange(e)} 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Username" />
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