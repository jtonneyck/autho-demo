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
    .then((user)=> {
      
      this.setState({
        user: user.data
      })
    })
    .catch(err=> {
      this.setState({
        err: err
      })
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Nav user={this.state.user}/>
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
