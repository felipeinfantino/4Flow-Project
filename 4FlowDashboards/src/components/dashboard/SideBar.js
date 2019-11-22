import React, {Component, useContext} from 'react'
import {slide as Menu} from 'react-burger-menu';
import firebase from "../firebase/Firebase";
import {Redirect} from "react-router";
import {AuthContext} from "../auth/Auth";
import './SideBar.css';
export const SideBar = () => {
const auth = useContext(AuthContext);


let user = firebase.auth().currentUser;
let email, userRoles, roleRedirect;

if (user != null) {
  console.log(user);
  email = user.email;
  console.log(email);
}

async function myPromise() {
  return new Promise((resolve, reject) => {
    var usersRef = firebase.database().ref("users/");
    usersRef.on("child_added", function(data) {
      var newVal = data.val();
      if(newVal.email === email) {
        userRoles = newVal.userRole;
        resolve(userRoles);
      }
    })
  })   
}

async function callingDB() {
  try {
    let callingDBFunction = await myPromise(); 
    console.log(callingDBFunction); 
    userRoles = callingDBFunction;
    console.log(userRoles);
    if(userRoles==="planer") {
      roleRedirect = "/planner";
    }
    else if(userRoles === "balancer") {
      roleRedirect = "/balancer";
    }
    else {
      roleRedirect = "/admin";
    }
  }
  catch(error) {
    console.log(error);
  }
}

callingDB();
    
        return (
            
           <Menu>
              <a className="menu-item" href="/link2">
                    Placeholder 2
                </a>
            </Menu>
      
        );
};

export default SideBar;
