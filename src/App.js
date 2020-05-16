import React, { Component } from 'react';
import './App.css';
import Login from './Login'
import Register from './Register'
import Home from './Home'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>  
        <div className="container">  
          <nav className="navbar navbar-expand-lg navheader">  
            <div className="collapse navbar-collapse" >  
              <ul className="navbar-nav mr-auto">  
                <li className="nav-item">  
                  <Link to={'/'} className="nav-link">Home</Link>  
                </li>  
                <li className="nav-item">  
                  <Link to={'/login'} className="nav-link">Login</Link>  
                </li> 
                <li className="nav-item">  
                  <Link to={'/register'} className="nav-link">Register</Link>  
                </li>  
              </ul>  
            </div>  
          </nav> <br />  
          <Switch>  
            <Route exact path='/' component={Home} />  
            <Route path='/login' component={Login} />  
            <Route path='/register' component={Register} />  
          </Switch>  
        </div>  
      </Router>
    );
  }
}

export default App;
