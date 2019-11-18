import React, {Component} from 'react'
import {slide as Menu} from 'react-burger-menu';
import firebase from "../firebase/Firebase";
import {Redirect} from "react-router";
import {AuthContext} from "../auth/Auth";
import './SideBar.css';

const SideBar = () => {
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
                    {userRole}
                </a>
            </Menu>
        );
};

export default SideBar;
