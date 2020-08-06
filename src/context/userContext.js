
import React, { createContext, Component } from "react";

export const UserContext = createContext();

const userDetails = localStorage.getItem('user')
class UserProvider extends Component {
    state = {
        token : localStorage.getItem('token'),
        user: userDetails ? JSON.parse(userDetails) : {}
    }

    setAuthToken = (token, user) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({
            user,
            token   
        })
    }

    render (){
        return(
            <UserContext.Provider value={{
                ...this.state, setAuthToken: this.setAuthToken
            }}>
              {this.props.children}  
            </UserContext.Provider>
        )
    }
}

export default UserProvider;