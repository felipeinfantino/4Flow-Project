import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/common.css';
import SideBar from '../dashboard/SideBar';
import {AuthProvider} from "../auth/Auth";
import Routes from './Routes'

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
                    <Routes/>
                </AuthProvider>
            </div>
        )
    }
}

export default App;