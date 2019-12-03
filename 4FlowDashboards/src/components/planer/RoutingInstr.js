import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';



class RoutingInstr extends React.Component {
    render() {
        return (
            <div class="container-instructions">
                <fieldset class="download-link">
                    <legend class="donwload-link-legend">Download and create roating instruction files</legend>
                    <a class="excelMac" href="#">Excel Macro Programming file</a>
                </fieldset>
                <div class="instructions-buttons">
                    <button class="btn-lg">Broadcast information to all parties</button><br></br>
                    <button class="btn-lg">Syncronize dates with parties</button><br></br>
                </div>
            </div>    

        );
    }
}

export default RoutingInstr;