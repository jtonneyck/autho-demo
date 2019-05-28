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
                <>
                <Link to={"/login"}>Login</Link>
                <Link to={"/sign-up"}>Sign up</Link>
                </>
                :
                <>
                    <Link to={"/profile"}>Profile</Link>
                    <Link onClick={props.logout}>Logout</Link>
                    <p>Welcome {props.user.username}</p>
                </>
            }

        </nav>
    )
}
