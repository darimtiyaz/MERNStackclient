import React, { createContext, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import About from  "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from './components/ErrorPage';
import Logout from './components/Logout';

import { initialState, reducer } from '../src/reducer/UseReducer';

  //1: contextAPI
  export const UserContext = createContext();
  
  const Routing = () => {
    return (
      <Switch>
        <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/Login">
        <Login />
      </Route>

      <Route path="/Signup">
        <Signup />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>

      <Route>
        <ErrorPage />
      </Route>
      </Switch>
    )
  }

  const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState, init)

    return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
      <Navbar /> 
      <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App
