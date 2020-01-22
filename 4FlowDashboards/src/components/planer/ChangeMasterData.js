import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/common.css';



class ChangeMasterData extends React.Component {
    render() {
        return (
                <fieldset class="master-data">
                    <legend class="master-data-legend">Preview Von Data</legend>
                        <form class="master-data-form container">
                            <div class="row data-row">
                                <div class="col-lg-4 data-col">
                                    <span>Order ID</span><input type="text" value="id12343543534"></input>
                                </div>
                                <div class="col-lg-4 data-col">
                                    <span>Antrag Name+Bachelor</span><input type="text" value="Vehiculum NP"></input>
                                </div>
                                <div class="col-lg-4 data-col">
                                    <span>Plant</span><input type="text" value="Some Plant"></input>
                                </div>
                            </div>
                            <div class="row data-row">
                                <div class="col-lg-4 data-col">
                                    <span>Supplier</span><input type="text" value="Amazon"></input>
                                </div>
                                <div class="col-lg-4 data-col">
                                    <span>Carrier</span><input type="text" value="Google"></input>
                                </div>
                                <div class="col-lg-4 data-col">
                                    <span>Hub Provider</span><input type="text" value="IBM"></input>
                                </div>
                            </div>
                            <div class="row data-row">
                                <div class="col-lg-4 data-col">
                                    <span>Price</span><input type="text" value="9000$"></input>
                                </div>
                            </div>
                            <div class="master-data-submission">
                                <button type="submit" class="master-data-submit btn btn-success btn-sm">Submit</button>
                            </div>
                        </form>
                </fieldset>
        );
    }
}

export default ChangeMasterData;