import React, {Component} from 'react'
import {Form, Card, Button} from 'react-bootstrap';

export class SupplierContact extends Component {
    render() {
        return (
            <div id="contact-template">
                <div className="template-body">
                    <form action="/sendMails" method="POST">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group" style={{ marginTop: '20px', marginLeft: '100px' }}>
                                    <label className="control-label" style={{ marginTop: '20px' }}><strong>Suppliers</strong></label>
                                    <select className="form-control" name="suppliers">
                                        <option>Apple</option>
                                        <option>Google</option>
                                        <option>Amazon</option>
                                        <option>Microsoft</option>
                                        <option>Huawei</option>
                                    </select>
                                    <br></br>
                                    <button className="btn btn-primary btn-sm">Add supplier</button>
                                </div>
                            </div> 
                            <div className="col-md-9">
                                <div className="form-group" style={{ marginTop: '20px', marginLeft: '100px' }}>
                                    <label className="control-label" style={{ marginTop: '20px' }}><strong>Mail content</strong></label>
                                    <br></br>
                                    <textarea name="mailBody" rows="25" cols="100"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button type="submit" style={{ marginLeft: '700px' }} className="btn btn-primary btn-sm">Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SupplierContact