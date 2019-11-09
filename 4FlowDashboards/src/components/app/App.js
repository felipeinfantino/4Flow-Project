import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Link, Switch,} from 'react-router-dom'
import Planer from '../planer/Planer';
import Balancer from '../balancer/Balancer';
import UserLoginForm from '../user/UserLogin';
import UserCreate from "../admin/UserCreate"
import SideBar from '../dashboard/SideBar';
import ChangePasswordModal from '../user/ChangePasswordModal';
import Logout from '../user/Logout'
import {AuthProvider} from "../auth/Auth";
import PrivateRoute from "../auth/PrivateRoute";

document.body.style = 'background: black;';

export const columnNames = {
    TO_DO: 'To do',
    IN_PROGRESS: 'In progress',
    WAITING: 'Waiting',
    DONE: 'Done',
};

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <SideBar/>
                <header className="App-header">
                    <h1 className="App-title">Admin</h1>
                </header>
                <AuthProvider>
                    <BrowserRouter>
                        <div className="menu">
                            <ul>
                                <li><Link to="/">Planer</Link></li>
                                <li><Link to="/balancer">Balancer</Link></li>
                                <li><Link to="/change-password">Change Password</Link></li>
                                <li><Link to="/create-account">Create new User</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        </div>
                        <div className="App-intro">
                            <Switch>
                                <PrivateRoute exact path="/" component={Planer}/>
                                <PrivateRoute path="/balancer" component={Balancer}/>
                                <PrivateRoute path="/change-password" component={ChangePasswordModal}/>
                                <PrivateRoute path="/create-account" component={UserCreate}/>
                                <PrivateRoute exact path="/logout" component={Logout}/>
                                <Route exact path="/login" component={UserLoginForm}/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </AuthProvider>
            </div>
        )
    }
}

export default App;