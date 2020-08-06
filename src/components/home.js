import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

const { REACT_APP_BACKENDURL } = process.env;
export const Home = (props) => {

    const { setAuthToken, token, user } = useContext(UserContext);
    const submitLogout = () => {
        fetch(`${REACT_APP_BACKENDURL}/logout`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.localStorage.getItem('token') ? `Bearer ${window.localStorage.getItem('token')}` : ''
            },
            body: JSON.stringify({})
          })
          .then(response => {
              if (!response.ok) { throw response }
              return response.json()
            })
          .then(data => {
              if(data.message){
                setAuthToken(``, {})
                localStorage.removeItem(`user`)
                localStorage.removeItem(`token`)
              }
          })
          .catch(error => {
        });
    }
    return (
        <div>
           
            { token ? 
            <>
                <h1 className= "headerTitleStyle"> Hi {user.user_email}  </h1>
                <button className="ui button" onClick={submitLogout}> Logout </button> 
            </>
            :
            <div className="headerTitleStyle alignClass">
                <h1 className= "headerTitleStyle" >Welcome User</h1>
                <button className="ui button" onClick={()=>props.history.push('/login')}> Login</button> 
                <button className="ui button" onClick={()=>props.history.push('/registration')}> Sign Up</button> 
            </div>
            }
        </div>
    )
}