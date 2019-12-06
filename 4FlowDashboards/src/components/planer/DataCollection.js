import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Checkbox} from 'react-router-dom';



class DataCollection extends React.Component {
    render() {
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
                                            <span>Company 1</span><br></br>
                                            <button class="btn btn-sm btn-success" type="sumbit">Contact</button>
                                        </div>    
                                    </li>
                                    <li>
                                        <div class="company-details">
                                            <span>Company 2</span><br></br>
                                            <button class="btn btn-sm btn-success" type="sumbit">Contact</button>
                                        </div>    
                                    </li>

                                </ul>
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
                    <button class="btn btn-sm btn-success">Done</button>
                </div>
            </div>
        );
    }
}

export default DataCollection;