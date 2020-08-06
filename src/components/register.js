import React, { useState, useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "../index.css";
import { Validation } from "../utility/validation";
 
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../context/userContext';

const validation = new Validation();
const { REACT_APP_BACKENDURL } = process.env;

export const Registration = (props) => {

    const { setAuthToken, token } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setconfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [errorMsg, setErrMsg] = useState({});
    const [apiErrMsg, setApiErrMsg] = useState("");

    const handleChange = date => setDob(date);
    useEffect(()=>{
        if(token) {
            props.history.push('/')
        }
    }, [token]);

    const registerApi = e => {
        e.preventDefault();
            const data = {
                user_email: e.target.email.value,
                user_password: e.target.password.value,
                user_phone: e.target.phone.value,
                user_dob: dob,
                user_name: e.target.username.value,
            }
            fetch(`${REACT_APP_BACKENDURL}/register`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()                
                })
            .then(data => {
                const { token, ...user } = data;
                setAuthToken(token, user);
            })
            .catch((error) => {
                setApiErrMsg(error.statusText);
            });
    }

    return (
        <form className="ui form container register col-md-6" onSubmit={registerApi}>
            <h1 className= "headerTitleStyle"> Registration Page </h1>
            <div className="field">
                <label>Username</label>
                <input type="text" name="username" placeholder="Username" value={username}
                    onChange={e => setUserName(e.target.value)} required/>
            </div>
            <div className="field">
                <label>Email</label>
                <input type="text" name="email" placeholder="Email" onBlur={()=>validation.validate('email', email, setErrMsg)} value={email}
                    onChange={e => setEmail(e.target.value)} required/>
                    <span style={{color: "red"}}>{errorMsg.email}</span>

            </div>
            <div className="field">
                <label>Phone</label>
                <input type="text" name="phone" placeholder="Phone" onBlur={()=>validation.validate('phone', phone, setErrMsg)} value={phone}
                    onChange={e => setPhone(e.target.value)} required/>
                <span style={{color: "red"}}>{errorMsg.phone}</span>
            </div>
            <div className="field">
                <label>Dob</label>
                <DatePicker placeholderText="MM/DD/YYYY" selected={dob} onChange={handleChange} />
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" onBlur={()=>validation.validate('password', password, setErrMsg)} value={password}
                    onChange={e => setPassword(e.target.value)} required/>
            </div>
            <div className="field">
                <label>Confirm password</label>
                <input type="password" name="confirm_password" placeholder="Confirm password" onBlur={()=>validation.validate('confirm_password', confirm_password, setErrMsg)} value={confirm_password}
                    onChange={e => setconfirmPassword(e.target.value)} required/>
                <span style={{color: "red"}}>{errorMsg.confirm_password}</span>    
            </div>
            <span style={{color: "red"}}>{errorMsg.password}</span>
            <button disabled={Object.keys(errorMsg).length !== 0 }className="ui button" type="submit">Submit</button>
            { apiErrMsg ? <span style={{color: "red"}}>{apiErrMsg}</span> : ''}
        </form>
    )
}