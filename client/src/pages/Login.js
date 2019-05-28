import React, { Component } from 'react';
import axios from "axios";
import "./Login.css"
export default class Login extends Component {

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
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}users/login`,
            data: this.state,
            method: "post",
            withCredentials: true
        })
        .then((response)=> {
            debugger
            this.props.fetchUser()
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
                    <button type="submit">Log in</button>
                </form>
                {this.state.err? <h1>{this.state.err.response.data.message}</h1>:""}
            </div>
        )
    }
}
