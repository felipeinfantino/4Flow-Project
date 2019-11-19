import React, {Component} from 'react'
import {slide as Menu} from 'react-burger-menu';
import firebase from "../firebase/Firebase";
import {Redirect} from "react-router";
import {AuthContext} from "../auth/Auth";
import './SideBar.css';

export const SideBar = () => {

    //firebase
    var ref = firebase.database().ref();
      ref.on("value", function(snapshot) {
         console.log(snapshot.val());
      }, function (error) {
         console.log("Error: " + error.code);
      });

    //firebase ends
    let userRole = "planner";
    let roleRedirect;

    if(userRole === "balancer") {
      userRole = "balancer";
      roleRedirect = "/balancer"
    }
    else if(userRole === "planner") {
      userRole = "planner";
      roleRedirect = "/planner";
    }
    else {
      userRole = "admin";
    }
        return (
            <Menu>
                <a className="menu-item" href={roleRedirect}>
                    {this.props.name}
                </a>
            </Menu>
        );
};

export default SideBar;
