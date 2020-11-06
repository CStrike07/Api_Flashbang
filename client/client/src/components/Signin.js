import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'

const Signin = () =>{
    const SignIn = () =>{
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://localhost:3000/google'
        fetch(proxyUrl+targetUrl)
        .then(res=>{
            return res.json()
        })
    
    }
    
    return(
        <div className = "my-card">
            <div className="card auth-card center">
                <h2>Sign In</h2>
                {/* <a href="/google" className="waves-effect waves-light btn"> <button>login</button> </a> */}
                <button className="waves-effect waves-light btn"onClick = {()=>SignIn()}>
                    Signin With Google 
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
                
                    
            </div>
        </div>
    )
}

export default Signin