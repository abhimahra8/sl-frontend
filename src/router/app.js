import React from 'react';
import {
    BrowserRouter,
    Route
  } from "react-router-dom";

import { Login } from "../components/login";
import { Registration } from "../components/register";
import { Home } from '../components/home';


const App = () => {
    return (
      <div>
          <BrowserRouter>
            <div>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/registration" component={Registration} />
            </div>
          </BrowserRouter>
      </div>
    )
};

export default App;