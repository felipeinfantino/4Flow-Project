import React, {Component} from "react";
import './UserCreate.css'
import firebase from "../firebase/Firebase";
import { Redirect } from 'react-router-dom'
var dir = false;

function writeUserData(name, passW,role) {
  return firebase.database().ref('/users/' + name).once('value').then(function(snapshot) {
      if (snapshot.val() !== null) {
        alert("Username already exists, please choose another name");
      }else{
        //alert("doesnt exists")
        writeUserDataHelp(name, passW,role);
        dir = true;
        firebase.auth().signOut();
        
      }
    });
}

function writeUserDataHelp(name, passW,role) {
    firebase.database().ref('users/'+name).set({
        username: name,
        password: passW,
        userRole:role,
    });
    return 0;
}

function readUserData(name){
return firebase.database().ref('/users/' + name).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  if (snapshot.val() !== null) {
        alert("Your username is: "+username)
      }else{
        alert("Username does not exist")
      }
});

}

class UserCreate extends Component{
     constructor(props) {
        super(props);
        this.state = {
            username: ' ',
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
            username: this.state.username,
            userpassword: this.state.userpassword,
            role: this.state.role
        }
        //readUserData(myForm.username)
        writeUserData(myForm.username, myForm.userpassword,myForm.role);
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
                <form onSubmit={this.handleSubmit} id="userForm">
                    <div className="form-group">
                        <label htmlFor="usernameInput">Username</label>
                        <input 
                            name='username'
                            value={this.state.username}
                            onChange={e => this.handleChange(e)} 
                            type="text" 
                            className="form-control" 
                            id="usernameInput" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter new username">
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