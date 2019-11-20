import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch,} from 'react-router-dom'
import Planer from '../planer/Planer';
import Balancer from '../balancer/Balancer';
import Admin from '../admin/Admin';
import UserLoginForm from '../user/UserLogin';
import UserCreate from "../admin/UserCreate"
import SideBar from '../dashboard/SideBar';
import ChangePasswordModal from '../user/ChangePasswordModal';
import ResetPassword from '../user/ResetPassword';
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
                    <div className="App-title">4Flow-Dashboard</div>
                </header>
                <AuthProvider>
                    <BrowserRouter>
                        <Navbar bg="light" expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link><Link to="/">Planer</Link></Nav.Link>
                                    <Nav.Link><Link to="/balancer">Balancer</Link></Nav.Link>
                                    <Nav.Link><Link to="/admin">Admin</Link></Nav.Link>
                                </Nav>
                                <Nav style={this.getNavUserStyle()}>
                                    <NavDropdown title="User" id="basic-nav-dropdown">
                                        <NavDropdown.Item><Link to="/change-password">Change Password</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to="/reset-password">Reset Password</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to="/create-account">Create new User</Link></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item><Link to="/logout">Logout</Link></NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div className="App-intro">
                            <Switch>
                                <PrivateRoute exact path="/" component={Planer}/>
                                <PrivateRoute path="/balancer" component={Balancer}/>
                                <PrivateRoute path="/admin" component={Admin}/>
                                <PrivateRoute path="/change-password" component={ChangePasswordModal}/>
                                <PrivateRoute path="/reset-password" component={ResetPassword}/>
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
    getNavUserStyle = () => {
        return {
            paddingRight: '100px',
        }
    }
}

export default App;