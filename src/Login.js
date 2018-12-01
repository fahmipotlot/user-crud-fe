import React, { Component } from 'react';
import logo from './logo.svg';
import Axios from 'axios';
import {Redirect} from "react-router-dom";

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
        email:'',
        password:''
    }
    this.handelChange=this.handelChange.bind(this);
    this.submit=this.submit.bind(this);
  }

  handelChange(event){
    let name=event.target.name;
    let value=event.target.value;
    // console.log(name, value);

    let data={};
    data[name]=value;

    this.setState(data);
  }

  render() {
    if(this.state.loggedIn){
        return <Redirect to='/'/>
    }
    return (
        <div className="App">
            <h4>Login</h4>
            <form onSubmit={this.submit}>
                <div>
                    <input type="text" name='email' value={this.state.email} placeholder="email" onChange={this.handelChange}/>
                </div>
                <div>
                    <input type="password" value={this.state.password} name='password' placeholder="password" onChange={this.handelChange}/>
                </div>
                <input type="submit" value='submit'/>
            </form>
        </div>
    );
  }

  submit(e){
      e.preventDefault();
      window.axios.post('/user/login', {email:this.state.email,password:this.state.password})
      .then(response=>{
          console.log(response);
          this.setState({loggedIn:true});
          localStorage.setItem('token', response.data.token);
      });
  }
}

export default Login;
