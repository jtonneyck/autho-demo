import React from 'react'
import {Link} from 'react-router-dom';
import "./Nav.css"
export default function Nav(props) {
    debugger
    return (
        <nav>
            <Link to={"/"}>Home</Link>
            
            {
                Object.keys(props.user).length === 0?
                <div>
                <Link to={"/login"}>Login</Link>
                <Link to={"/sign-up"}>Sign up</Link>
                </div>
                :
                <div>
                    <Link to={"/logout"}>Logout</Link>
                    <p>Welcome {props.user.username}</p>
                </div>
            }
            <Link to={"/profile"}>Profile</Link>
            
        </nav>
    )
}
