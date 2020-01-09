import React, {useState, useEffect} from 'react';
import './companies.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../firebase/Firebase";
import Grid from "./Grid";
import Form from "./Form";


function useDbData(){

    const [dbData, setDbData] = useState([]);
    useEffect(() => {
        firebase.firestore().collection('CompanyDetails').onSnapshot((snapshot) =>{
            const newDbData = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))
            setDbData(newDbData);
        })
    }, []);
    return dbData;
}

function Companies() {

    const dbData = useDbData();
    function handleClick(data){
        firebase.firestore().collection('CompanyDetails').add({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            type: data.type
        })
    }
        return (
            <div>
                <fieldset className="contact">
                   {/* <legend id="contact-legend" className="contact-legend"></legend> */}
                   <Form onHandleClick={handleClick}/>
                    <div className="grid-view">
                        <div className="grid-container" >
                            <div className="company-grid-header">
                                <div className="grid-header"><span>Name</span></div>
                                <div className="grid-header"><span>Email</span></div>
                                <div className="grid-header"><span>Phone</span></div>
                                <div className="grid-header"><span>Address</span></div>
                                <div className="grid-header"><span>Type</span></div>
                            </div>
                            <div>
                                {dbData.map((doc) =>{
                                        return <Grid 
                                        key = {doc.id}
                                        id = {doc.id}
                                        name = {doc.name}
                                        email = {doc.email}
                                        phone = {doc.phone}
                                        address = {doc.address}
                                        type = {doc.type}
                                    />
                                })}
                            </div>
                        </div>
                        <div className="company-grid-bottom">
                            {/* <input className="grid-search" type="text" placeholder="Search company by name"/> */}
                        </div>
                    </div>
                </fieldset>
            </div>
        );
}
export default Companies;