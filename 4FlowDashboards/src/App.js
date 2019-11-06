import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
} from 'react-router-dom'
import Planer from './components/Planer';
import About from './components/About';
import Balancer from './components/Balancer';
import UserLoginForm  from './components/auth/UserLogin';
import UserCreate from "./components/UserCreate"
import SideBar from './components/SideBar';
import ChangePasswordModal from './components/ChangePasswordModal';
import Logout from './components/auth/Logout'
import resetPassword from './components/resetPassword';
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";

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
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/create-account">Create new User</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                                <li> <Link to="/reset-password">Reset Password</Link> </li>
                            </ul>
                        </div>
                        <div className="App-intro">
                            <Switch>
                                <PrivateRoute exact path="/" component={Planer}/>
                                <PrivateRoute path="/balancer" component={Balancer}/>
                                <PrivateRoute path="/change-password" component={ChangePasswordModal}/>
                                <PrivateRoute path="/about" component={About}/>
                                <PrivateRoute path="/create-account" component={UserCreate}/>
                                <PrivateRoute exact path="/logout" component={Logout}/>
                                <Route exact path="/login" component={UserLoginForm}/>
                                <Route path="/reset-password" component={resetPassword} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </AuthProvider>
            </div>
        )
    }
}

export default App;