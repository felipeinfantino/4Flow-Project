import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, Button, FormControl } from 'react-bootstrap';
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
                    <div className="App-title">4Flow-Dashboard</div>
                </header>
                <AuthProvider>
                    <BrowserRouter>
                        {/* <div className="menu">
                            <ul>
                                
                                <li><Link to="/balancer">Balancer</Link></li>
                                <li><Link to="/change-password">Change Password</Link></li>
                                <li><Link to="/create-account">Create new User</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                                    <li className="nav-item active">
                                        <p className="nav-link" href="#"><Link to="/">Planer</Link></p>
                                    </li>
                                    <li className="nav-item active">
                                        <p className="nav-link" href="#"><Link to="/balancer">Balancer</Link></p>
                            </ul>
                        </div> */}
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#home">Home</Nav.Link>
                                    <Nav.Link href="#link">Link</Nav.Link>
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                        <div className="App-intro">
                            <Switch>
                                <PrivateRoute exact path="/" component={Planer}/>
                                <PrivateRoute path="/balancer" component={Balancer}/>
                                {/* <PrivateRoute path="/change-password" component={ChangePasswordModal}/>
                                <PrivateRoute path="/create-account" component={UserCreate}/>
                                <PrivateRoute exact path="/logout" component={Logout}/>
                                <Route exact path="/login" component={UserLoginForm}/> */}
                            </Switch>
                        </div>
                    </BrowserRouter>
                </AuthProvider>
            </div>
        )
    }
}

export default App;