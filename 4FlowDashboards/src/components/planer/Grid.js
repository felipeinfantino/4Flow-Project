import React, {useState} from 'react';
import './companies.css';
import firebase from "../firebase/Firebase";

var db =  firebase.firestore();

function Grid(props){

    const [data, setData] = useState({
        name: props.name,
        email: props.email,
        phone: props.phone,
        address: props.address,
        type: props.type
    })

    function handleChange(event){
        
    const { name, value } = event.target;
    setData(prevValue => {
      console.log(prevValue)
      return {
        ...prevValue,
        [name]: value
      };
    });
        db.collection('CompanyDetails').doc(props.id).update({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            type: data.type
        })
    }

    function deleteRecord(e){
        e.preventDefault();
        let id = props.id
        db.collection('CompanyDetails').doc(id).delete();
    }
    
    return <div className="grid-body" id={props.id} >
                <div className="grid-header-line"><input name="name" type="text" defaultValue={data.name} onChange={handleChange}/></div>
                <div className="grid-header-line"><input name="email" type="text" defaultValue={data.email} onChange={handleChange}/></div>
                <div className="grid-header-line"><input name="phone" type="text" defaultValue={data.phone} onChange={handleChange}/></div>
                <div className="grid-header-line"><input name="address" type="text" defaultValue={data.address} onChange={handleChange}/></div>
                <div className="grid-header-line"><select name="type" onChange={handleChange} value={data.type} style={{width:"200px",width: "200px", backgroundColor: "#c5ccd6", height: "27px"}}>
                                                    <option value="1">Supplier</option>
                                                    <option value="2">Carrier</option>
                                                    <option value="3">Hub Provider</option>
                                                  </select><div className="del" onClick={deleteRecord}>x</div></div>
            </div>  
}

export default Grid;