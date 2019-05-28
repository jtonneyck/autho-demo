import React, { Component } from 'react';
import axios from "axios";
import "./Login.css"
export default class Signup extends Component {

    state = {
        username: "",
        password: "",
        err: null
    }


    handleChange = (e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (e)=> {
        e.preventDefault()
        
        axios({
            url: `http://localhost:3000/users/signup`,
            data: {
                username: this.state.username,
                password: this.state.password
            },
            method: "post"
        })
        .then((response)=> {
            this.props.history.push("/profile")
        })
        .catch((err)=> {
            debugger
            this.setState({
                err
            })
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <input type="text" placeholder="username" name="username" onChange={this.handleChange} />
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                    <button type="submit">Sign up</button>
                </form>
                {this.state.err? <h1>{this.state.err.response.data.message}</h1>:""}
            </div>
        )
    }
}
