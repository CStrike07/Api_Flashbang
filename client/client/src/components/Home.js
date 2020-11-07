import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component{
    
    componentDidMount(){
        
    }
    render(){
        return (
            <div className ="container">
                <h4 className="center">
                    Home
                </h4><br />
                <div className ="center">
                    <Link to="/buyer"><a className="waves-effect waves-light btn">Buyer</a></Link><br/><br/>
                    <Link to="/seller"><a className="waves-effect waves-light btn">Seller</a></Link>
                </div>

                
            </div>
        )
    }
    
}

export default Home