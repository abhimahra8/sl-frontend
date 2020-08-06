import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { Validation } from '../utility/validation';

const validation = new Validation();
const { REACT_APP_BACKENDURL } = process.env;

export const Login = (props) => {

    const { setAuthToken, token } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrMsg] = useState({});
    const [apiErrMsg, setApiErrMsg] = useState("");

    useEffect(()=>{
        if(token) {
            props.history.push('/')
        }
    }, [token]);
    
    const authenticate = e =>{
        e.preventDefault();
        const data = {
            user_email: e.target.email.value,
            user_password: e.target.password.value
        }
        fetch(`${REACT_APP_BACKENDURL}/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.localStorage.getItem('token') ? `Bearer ${window.localStorage.getItem('token')}` : ''
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
        <form className="ui form container register col-md-6" onSubmit={authenticate}>
            <h1 className= "headerTitleStyle"> Login Page </h1>
            <div className="field">
                <label>Email</label>
                <input type="text" name="email" placeholder="Email" value={email} onBlur={()=>validation.validate('email', email, setErrMsg)}
                    onChange={e => setEmail(e.target.value)} required/>
                <span style={{color: "red"}}>{errorMsg.email}</span>    
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} required/>
            </div>
            <button className="ui button" type="submit">Submit</button>
            { apiErrMsg ? <span style={{color: "red"}}>{apiErrMsg}</span> : ''}
        </form>
    )
}