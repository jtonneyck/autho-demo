import React from 'react';
import {Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import axios from 'axios';

class App extends React.Component {
  constructor(){
    super()
    this.fetchUser = this.fetchUser.bind(this)
    this.logout = this.logout.bind(this)
  }
  state = {
    user: {},
    err: null
  }

  componentDidMount() {
      this.fetchUser()
  }

  fetchUser = ()=> {
    debugger
    axios({
      url: `${process.env.REACT_APP_BACK_END_BASE_URL}users/get-user`,
      method: "post",
      withCredentials: true
    })
    .then((response)=> {
      this.setState({
        user: response.data
      })
    })
    .catch(err=> {
      this.setState({
        err: err
      })
    })
  }

  logout() {
    debugger
    axios({
      method: "post",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACK_END_BASE_URL}users/logout`
    })
    .then((response)=> {
      this.setState({
        user: {}
      })
    })
    .catch((err)=> {
      this.setState({
        err
      })
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Nav user={this.state.user} logout={this.logout} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" render={(props)=> <Login {...props} fetchUser={this.fetchUser} />} />
          <Route exact path="/sign-up" component={Signup} />
          <Route exact path="/profile" component={Profile} />
        </header>
      </div>
    )
  }
}

export default App;


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )
