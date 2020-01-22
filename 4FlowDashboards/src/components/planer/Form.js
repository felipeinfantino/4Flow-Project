import React,{useState, useEffect} from 'react'
import firebase from "../firebase/Firebase";
import '../../assets/styles/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';


var db =  firebase.firestore();

function Form(props){
    const [companyData, setCompanyData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        type: ""
    });
    
    function handleChange(event){
        const { name, value } = event.target;
        setCompanyData(prevValue => {
          return {
            ...prevValue,
            [name]: value
          };
        });
    }
    return <div className="addingCompany">
                <form className="add-comapny-form">
                    {/* <input name="qwerty" style={{width:"200px"}} /> */}
                    <input name="name" placeholder="Enter company name" onChange={handleChange} value={companyData.name}></input>
                    <input name="email" placeholder="Enter Email address" onChange={handleChange} value={companyData.email}></input>
                    <input name="phone" placeholder="Enter phone number" onChange={handleChange} value={companyData.phone}></input>
                    <input name="address" placeholder="Enter address" onChange={handleChange} value={companyData.address}></input>
                    <select name="type" onChange={handleChange} value={companyData.type}>
                        <option value="1">Supplier</option>
                        <option value="2">Carrier</option>
                        <option value="3">Hub Provider</option>
                    </select>
                    <button className="btn btn-light" style={{height: "28px",marginRight: "2px",fontSize: "13px"}} type="submit" onClick={event =>{
                            event.preventDefault();
                            props.onHandleClick(companyData);
                            setCompanyData({
                                name: "",
                                email: "",
                                phone: "",
                                address: "",
                                type: ""
                            })
                    }}>Add</button>
                </form>
        </div>
}



export default Form;