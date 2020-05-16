import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            loggedIn: false,
            name: '',
            username: '',
            email : '',
            password : '',
            password_confirmation : ''
        }
        this.handelChange=this.handelChange.bind(this);
        this.submit=this.submit.bind(this);
    }

    handelChange(event){
        let name = event.target.name;
        let value = event.target.value;

        let data = {};
        data[name] = value;

        this.setState(data);
    }

    submit(e){
        e.preventDefault();
        window.axios.post('/user/register', {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        })
        .then(response=>{
            this.setState({loggedIn:true});
            localStorage.setItem('token', response.data.token);
        }).catch(error => {
            alert("An Error Occured! " + error.response.data.message);
        });
    }

    render() {
        if(this.state.loggedIn){
            return <Redirect to='/'/>
        }
        
        return (
            <div className="col-md-6">
                <h5>Register</h5>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" placeholder="email" name='email' value={this.state.email} onChange={this.handelChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" placeholder="name" name='name' value={this.state.name} onChange={this.handelChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" placeholder="username" name='username' value={this.state.username} onChange={this.handelChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="password" name='password' value={this.state.password} onChange={this.handelChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Repeat Password</label>
                        <input type="password" className="form-control" placeholder="repeat password" name='password_confirmation' value={this.state.password_confirmation} onChange={this.handelChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;
