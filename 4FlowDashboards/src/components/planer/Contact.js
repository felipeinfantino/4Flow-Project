import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';



class Contact extends React.Component {
    render() {
        return (
            <div>
                 <fieldset class="contact">
                    <legend class="contact-legend">Company name</legend>
                        <div class="contact-details">
                            <div class="address">
                                <span>Address</span>
                                <input id="address" type="text" value="Sewanstrasse" type="text" disabled />
                            </div>
                            <div class="email">
                                <span >Email address</span>
                                <input id="email" type="text" value="email@gmail.com" disabled/>
                            </div>
                            <div class="phone">
                                <span>Phone number</span>
                                <input id="phone" type="text" value="1234567890" disabled/>
                            </div>
                        </div> 
                        <div>
                            <textarea class="issue-description" placeholder="Describe the issue"></textarea>
                        </div>
                        <div class="submittion-buttons">
                            <button class="btn btn-primary btn-sm">Save</button>
                            <button class="btn btn-danger btn-sm">Cancel</button>
                         </div>   
                 </fieldset>
                 <div class="grid-container">
                    <div class="grid-item grid-header">Issues Description</div>
                    <div class="grid-item grid-header">Employee</div>
                    <div class="grid-item grid-header">Date</div>  
                    <div class="grid-item white">Car broke in the middle of the way</div>
                    <div class="grid-item white">user1@gmail.com</div>
                    <div class="grid-item white">17.07.2019  3:00 PM</div>  
                    <div class="grid-item gray">Traffic jam for 3 hours</div>
                    <div class="grid-item gray">user2@gmail.com</div>
                    <div class="grid-item gray">23.09.2019</div>
                    <div class="grid-item white">Delay fue to storm for 2 hours</div>
                    <div class="grid-item white">user1@gmail.com</div>
                    <div class="grid-item white">26.11.2019</div>
        </div>       
            </div>
        );
    }
}

export default Contact;