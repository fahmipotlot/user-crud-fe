import React, { Component } from 'react';
import Moment from 'react-moment';

class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      users:[],
      status:'',
      editMode:false
    }

    this.handelChange=this.handelChange.bind(this);
    this.submit=this.submit.bind(this);
    this.update=this.update.bind(this);
  }

  componentDidMount(){
    this.fetchUsers();
  }

  fetchUsers(){
    window.axios.get('/master/user')
    .then(response=>{
      let users=response.data.data;
      this.setState({
        users:users
      })
    })
    .catch(error => {
      alert("An Error Occured! " + error.response.data.message);
    });
  }

  handelChange(event){
    let name=event.target.name;
    let value=event.target.value;

    let data={};
    data[name]=value;

    this.setState(data);
  }  

  submit(e){
    e.preventDefault();
    window.axios.post('/master/user', {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    })
    .then(response=>{
        this.fetchUsers();
        this.setState({
          name: '',
          username: '',
          email : '',
          password : '',
          password_confirmation : ''
        })
    })
    .catch(error => {    
      alert("An Error Occured! " + error.response.data.message + error.response.data.errors);
    });
  }

  editUser(id){
    this.setState({
      editMode:id
    })

    let editingItem = this.state.users.find(user=>{
      return user.id === id
    })

    this.setState({
      name : editingItem.name,
      username : editingItem.username,
      email : editingItem.email,
    })
  }

  update(e){
    e.preventDefault();
    let id = this.state.editMode;
    window.axios.put('/master/user/'+id, {
      name : this.state.name,
      username : this.state.username,
      email : this.state.email
    })
    .then(response=>{
        this.fetchUsers();
        this.setState({
          name : '',
          username : '',
          email : ''
        })
    })
    .catch(error => {
      alert("An Error Occured! " + error.response.data.message);
    });
  }

  deleteUser(id){
    window.axios.delete('/master/user/'+id)
    .then(response=>{
      this.fetchUsers();
    })
    .catch(error => {
      alert("An Error Occured! " + error.response.data.message);
    });
  }

  render() {
    const userItem = this.state.users.map(user=>
      {
        return (
          <div className="card" style={ { margin: '20px 30px' } } key={user.id} >
            <img src="https://fakeimg.pl/300/" className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Name: {user.name}</h6>
              <p className="card-text">
                Email : {user.email} <br></br>
                Registered at : <Moment format="DD MMMM YYYY HH:mm">{user.created_at}</Moment> <br></br>
                Updated at : <Moment format="DD MMMM YYYY HH:mm">{user.updated_at}</Moment>
              </p>
              
              <br></br>
              <br></br>

              <a className='card-link btn btn-sm btn-primary' style={ { color: '#fff', cursor: 'pointer'} }
                onClick={this.editUser.bind(this,user.id)}
              >
                Edit
              </a>
              <a className='card-link btn btn-sm btn-danger' style={ { color: '#fff', cursor: 'pointer'} }
                onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteUser(user.id) } }
              >
                Delete
              </a>
            </div>
          </div>
        )
      }
    );

    return (
      <div className="container">
        <div className="row">

          <div className="col-md-6">
            <h5>Create User</h5>
            <form onSubmit={this.submit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="name" name='name' value={this.state.name} onChange={this.handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="username" name='username' value={this.state.username} onChange={this.handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" placeholder="email" name='email' value={this.state.email} onChange={this.handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="password" name='password' value={this.state.password} onChange={this.handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password_confirmation">Password</label>
                <input type="password" className="form-control" id="password_confirmation" placeholder="password confirmation" name='password_confirmation' value={this.state.password_confirmation} onChange={this.handelChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

          <div className="col-md-6">
            <h5>Edit User</h5>
            <form onSubmit={this.update}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="name" name='name' value={this.state.name} onChange={this.handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="username" name='username' value={this.state.username} onChange={this.handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" placeholder="email" name='email' value={this.state.email} onChange={this.handelChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

        </div>

        <br></br>

        <h5>User List</h5>
        <div className="row">
          {userItem}
        </div>
      </div>        
    );
  }
}

export default Home;