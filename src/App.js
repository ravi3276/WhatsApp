import React,{useState} from 'react'
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import Login from './Login';
function App() {

  const [{user}]=useStateValue();

  return (


    <div className="app">

    {
      user ? (
        <div className="app__body">

        <Router>
        
        <Sidebar />
        <Switch>

        <Route path="/rooms/:roomId">
        <Chat />
        </Route>

        <Route path="/">
          <h1>gemo router</h1>
        </Route>

        </Switch>
        
        </Router>
        </div>
      ):(
        <div>
        <Login />
        </div>
      )
    }
   

    </div>
  )
}

export default App;
