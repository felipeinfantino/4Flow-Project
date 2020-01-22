import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/common.css';
import {Checkbox} from 'react-router-dom';
import { TaskContext } from '../taskManagment/TaskProvider';



class DataCollection extends React.Component {

    // CHECKBOX NOT WORKING FOR NOW ITS JUST A MOCK, COMPANY 1 AND COMPANY 2 are hardcoded and always contacted
    state = {
        contactedCompanies : [],
    }

    componentDidMount(){
        console.log(this.props.location.state);
        if(!this.props.location.state){
            alert("You have to pass the subtaskId , the todod")
            this.props.history.push("/planer");
            return;
        }

        const subTaskId = this.props.location.state.subTaskId;
        const todoId = this.props.location.state.todoId;
        if(!(subTaskId && todoId ) ){
            alert("You have to pass the subtaskId , the todod")
            this.props.history.push("/planer");
        }
        this.setState({subTaskId : subTaskId, todoId: todoId });
        if(this.props.location.state && this.props.location.state.contactedCompanies){
            this.setState({contactedCompanies: this.props.location.state.contactedCompanies })
        }
    }

    contactCompanies = () =>{
        this.props.history.push("/contacts", {companiesToContact: [{companyName: "Company 1", email: "felipe.infantino@hotmail.com"}, {companyName: "Company 2", email: "abdul@abdul.com"}], subTaskId: this.state.subTaskId, todoId: this.state.todoId});
    }

    render() {
        return (
            <TaskContext.Consumer>
                {(context) => {
                    return (
                        <div class="data-container" >
                        <div class="data-header">
                            <div class="plant-header">
                                <span>Plant</span>
                            </div>
                            <div class="supplier-header">
                                <span>Suppliers</span>
                            </div>
                            <div class="carrier-header">
                                <span>Carriers</span>
                            </div>
                            <div class="provider-header">
                                <span>Hub Provider</span>
                            </div>
                        </div>
                        <div class="data-body">
                            <div class="plant-details">
                                <div class="data-filters">
                                    <div class="data-filter1"><input id ="checkbox_id1" type="checkbox"/><label htmlFor="checkbox_id1">  Filter 1</label></div>
                                    <div class="data-filter2"><input id ="checkbox_id2" type="checkbox"/><label htmlFor="checkbox_id2">  Filter 2</label></div>
                                </div>
                                <div class="slidecontainer">
                                    <p>Price</p>
                                    <input type="range" min="1" max="100" value="50"/>
                                    <div class="slider-values">
                                        <span class="zero">0$</span>
                                        <span class="three">300$</span>
                                        <span class="thousand">1000$</span>
                                    </div>
                                    <div class="plant-search">
                                        <button>Search New</button>
                                    </div>
                                </div>
                                <div class="contact-company">
                                    <div class="contact-comapny-header">
                                        <span>Companies</span>
                                    </div>
                                    <div class="company-list">
                                        <ul>
                                            <li>
                                                <div class="company-details">
                                                    <div className="row company1" > 
                                                    <div className="form-check" style={{marginLeft: "-15px",position: "relative",display: "block",paddingLeft: "1.25rem"}}>
                                                        <label className="form-check-label" style={{float: "left", margin:"5px"}}>
                                                                <input type="checkbox" class="form-check-input" value=""/><span>Company 1</span><br></br>
                                                        </label>
                                                        </div>
                                                    </div>
                                                    <div className="row company1-contact">
                                                    <div>
                                                    {this.state.contactedCompanies.includes("Company 1") ? <p className="contact-status green-st">Contacted</p> : <p className="contact-status red-st">Not contacted</p>}
                                                    </div>  
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                            <div class="company-details">
                                                    <div className="row company2">
                                                    <div className="form-check">
                                                        <label className="form-check-label" style={{float: "left", margin:"5px"}}>
                                                                <input type="checkbox" class="form-check-input" value=""/><span>Company 2</span><br></br>
                                                        </label>
                                                        </div>
                                                    </div>
                                                    <div className="row company2-contact" >
                                                    <div>
                                                    {this.state.contactedCompanies.includes("Company 2") ? <p className="contact-status green-st">Contacted</p> : <p className="contact-status red-st">Not contacted</p>}
                                                    </div>  
                                                    </div>
                                                </div> 
                                            </li>
        
                                        </ul>
                                        <button class="btn btn-sm btn-success btn-contact" type="btn" onClick={this.contactCompanies} >Contact</button>
                                    </div>   
                                </div>
                            </div>
                            <div class="supplier-details"></div>
                            <div class="carrier-details"></div>
                            <div class="provider-details"></div>
                        </div>
                        <div class="footer-buttons">
                            <button class="btn btn-sm btn-primary">Save</button>
                            <button class="btn btn-sm btn-danger">Cancel</button>
                            <button class="btn btn-sm btn-success" onClick={() =>{
                                context.togglePlanerSubtask(this.state.subTaskId, this.state.todoId)
                                this.props.history.push("/planer");
                            } 
                        }
                            
                            >Done</button>
                        </div>
                    </div>
                    )
                }}
        </TaskContext.Consumer>
        );
    }
}

export default DataCollection;