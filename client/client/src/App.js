import React, { Component } from 'react'
import {BrowserRouter , Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Signin from "./components/Signin"
import Signup from "./components/Signup"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className= 'App'>
          <Navbar/>
          <Route exact path='/' component = {Home}/>
          <Route path='/signin' component = {Signin}/>
          <Route path='/signup' component = {Signup}/>


        </div> 
      </BrowserRouter>
    )
  }
}

export default App
