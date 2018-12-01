import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

window.token= localStorage.getItem('token');

window.axios=axios;
axios.defaults.baseURL='http://localhost:8000/api';
axios.defaults.headers.common['Authorization']= "Bearer "+ window.token;
axios.defaults.headers.post['Content-Type']= 'application/json';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
