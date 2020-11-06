import React from 'react'
import {Link, NavLink ,withRouter} from 'react-router-dom'
//this withRouter is called a higher order component learn more about this 
const Navbar = (props) => {
    
    return (
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <a  className = "brand-logo">Hackthon</a>
                <ul className = "right">
                    <li><Link to='/'>Home</Link></li>
                    <li><NavLink to='/signin'>Sign In</NavLink></li>
                    <li><NavLink to='/signup'>sign Up</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}


export default withRouter(Navbar)