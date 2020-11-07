import React, { Component } from 'react'
import {BrowserRouter , Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Buyer from "./components/Buyer"
import Seller from "./components/Seller"
import AllSellers from "./components/AllSellers"
import Profile from "./components/Profile"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className= 'App'>
          <Navbar/>
          <Route exact path='/' component = {Home}/>
          <Route path='/signin' component = {Signin}/>
          <Route path='/signup' component = {Signup}/>
          <Route path="/buyer" component = {Buyer}/>
          <Route path= "/Seller" component = {Seller}/>
          <Route path= "/allsellers" component = {AllSellers}/>
          <Route path= "/profile" component = {Profile}/>



        </div> 
      </BrowserRouter>
    )
  }
}

export default App
