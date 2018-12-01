import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Register from './Register'
import Home from './Home'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>

            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>

            <div>
              <Route path='/' exact={true} component={Home}/>
              <Route path='/register' component={Register}/>
              <Route path='/login' component={Login}/>
            </div>
          </header>
        </div>        
      </Router>
    );
  }
}

export default App;
