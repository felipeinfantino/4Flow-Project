import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';



class CreateRoute extends React.Component {
    render() {
        return (
            <div class="route-container" >
                <fieldset class="route-file-upload">
                    <legend class="route-file-legend">Upload 4Flow vista file</legend>
                    <button class="upload-button">Choose File</button><label class="route-label">Chosen file</label>
                </fieldset>
                <div class="buttons-container">
                    <button>Assign Tarif to tour</button><br></br>
                    <button>Extra Details</button><br></br>
                    <button>Wait/Contact Balancer</button><br></br>
                </div>
                <div class="buttons-container">
                    <button class="btn btn-success btn-sm route-success">Done</button>
                    <button class="btn btn-danger btn-sm route-danger">Cancel</button>
                </div>

            </div>
        );
    }
}

export default CreateRoute;