import React, {Component} from "react";
import './../UserCreate.css'

class UserCreate extends Component{
    render(){
        return(
            <div id="createUserForm">
                <form id="userForm">
                    <div className="form-group">
                        <label htmlFor="usernameInput">Username</label>
                        <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="Enter new username"></input>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <p>Role</p>
                    <select className="form-control form-control-sm">
                        
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