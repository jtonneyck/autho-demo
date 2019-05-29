import React, { Component } from 'react'
import axios from "axios"
import "./Login.css"

export default class Profile extends Component {
    constructor(props){
        super(props)
        debugger
        this.state = {
            username: props.user.username,
            profilePic: "",
            password: "password"
        }
        this.formRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);

    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
        e.preventDefault()
        let formData = new FormData(this.formRef)

        axios({
            url: "localhost:3000/users/update",
            data: formData,
            method: "post"
        })
        .then((user)=> {
            debugger
        })
        .catch((user)=> {
            debugger
        })
    }
    render() {
        return (
            <div>
                
                <form ref={this.formRef} onSubmit={this.submit}>
                    <input onChange={this.handleChange}type="text" name="username" value={this.state.username}/>
                    <input onChange={this.handleChange}type="password" name="password" value={this.state.password} />
                    <input onChange={this.handleChange}type="file" name="profilePic" value={this.state.profilePic} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
