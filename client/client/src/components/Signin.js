import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
const Signin = () =>{
    const SignIn = () =>{
        useEffect(() => {
            fetch('/google',{
                
            }).then(res => res.json())
            .then(result => {
                console.log(result)

            })
        }, [])
    }
    
    
    return(
        <div className = "my-card">
            <div className="card auth-card center">
                <h2>Sign In</h2>
                
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