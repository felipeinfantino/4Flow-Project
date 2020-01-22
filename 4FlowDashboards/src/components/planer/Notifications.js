import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/common.css';



class Notifications extends React.Component {
    render() {
        return (
            <div>
                <fieldset class="notifications">
                    <legend class="notifications-legend">Download and create roating instruction files</legend>
                    <div class="container-notification">
                        <div class="new-notification">
                            <div class="new-notification-header yellow-header">
                                New notifications
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item lst-note pink">Traffic Jam<button  class="btn btn-danger btn-sm  btn-mark">Mark as solved</button></li>
                                <li class="list-group-item lst-note pink">Car problem<button  class="btn btn-danger btn-sm  btn-mark">Mark as solved</button></li>
                            </ul>
                        </div>
                        <div class="solved-notification">
                            <div class="new-notification-header green-header">
                                Solved notifications
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item lst-note grey">Traffic Jam<button   class="btn btn-success btn-sm  btn-mark">Unmark</button></li>
                                <li class="list-group-item lst-note grey">Truck trouble<button  class="btn btn-success btn-sm  btn-mark">Unmark</button></li>
                                <li class="list-group-item lst-note grey">Traffic Jam<button  class="btn btn-success btn-sm  btn-mark">Unmark</button></li>
                            </ul>
                        </div>
                        <div class="archived-notification">
                            <div class="new-notification-header gray-header">
                                Archived notifications
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item lst-note dark-grey">Car Sputtering Engine</li>
                                <li class="list-group-item lst-note dark-grey">Flat Tires</li>
                                <li class="list-group-item lst-note dark-grey">Brakes Squeaking or Grinding</li>
                                <li class="list-group-item lst-note dark-grey">Traffic Jam</li>
                                <li class="list-group-item lst-note dark-grey">Flat Tires</li>
                            </ul>
                        </div>
                    </div>
                </fieldset>
            </div>    
    

        );
    }
}

export default Notifications;