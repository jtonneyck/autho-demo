import React, { Component } from 'react'
import axios from "axios"
import "./Login.css"
import "./Profile.css"

export default class Profile extends Component {
    constructor(props){
        super(props)
        debugger
        this.state = {
            username: props.user.username,
            profilePic: "",
            password: "password"
        }
        this.formRef = React.createRef(); // new
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
        let form = this.formRef.current // document.getElementById("theForm")
        let formData = new FormData(form) // new
        debugger
        axios({
            url: "http://localhost:3000/users/update",
            data: formData,
            method: "post",
            headers: {'Content-Type': 'multipart/form-data' }, //new
            withCredentials: true
        })
        .then((user)=> {
            this.props.fetchUser()
        })
        .catch((user)=> {
            debugger
        })
    }
    render() {
        return (
            <div className="flex-container">
    
                <form ref={this.formRef} /*new*/ onSubmit={this.submit} id="theForm">
                    <input onChange={this.handleChange}type="text" name="username" value={this.state.username}/>
                    <input onChange={this.handleChange}type="password" name="password" value={this.state.password} />
                    <input onChange={this.handleChange}type="file" name="profilePic" value={this.state.profilePic} />
                    <button type="submit">Submit</button>
                </form>

                { this.props.user.profilePic? 
                    <img id="profile-pic" src={`http://localhost:3000/images/${this.props.user.profilePic}`} alt=""/>
                    :
                    <h1>Please upload your profile picture</h1>
                }
            </div>
        )
    }
}
