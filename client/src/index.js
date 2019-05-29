import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { withRouter } from "react-router";
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router } from "react-router-dom";

const AppWithR = withRouter(App) 
/*
higher order component 'hoc': it's an function that creates a component
in this case it creates App with all props from react-router, like location, history and match
it enables us to call this.props.history.push in App
*/
ReactDOM.render(<Router><AppWithR/></Router>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
