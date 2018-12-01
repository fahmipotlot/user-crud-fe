import React, { Component } from 'react';
import Axios from 'axios';

class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      loanstatus:[],
      status:'',
      editMode:false
    }

    this.handelChange=this.handelChange.bind(this);
    this.submit=this.submit.bind(this);
    this.update=this.update.bind(this);
  }

  componentDidMount(){
    this.fetchLoanstatus();
  }

  fetchLoanstatus(){
    window.axios.get('/master/loan-status')
    .then(response=>{
      console.log(response);

      let loanstatus=response.data;

      this.setState({
        loanstatus:loanstatus
      })
    })
  }

  handelChange(event){
    let name=event.target.name;
    let value=event.target.value;
    // console.log(name, value);

    let data={};
    data[name]=value;

    this.setState(data);
  }  

  submit(e){
    e.preventDefault();
    window.axios.post('/master/loan-status', {name:this.state.name})
    .then(response=>{
        console.log(response);
        this.fetchLoanstatus();
        this.setState({
          name:''
        })
    });
  }

  editStatus(id){
    this.setState({
      editMode:id
    })

    let editingItem= this.state.loanstatus.find(status=>{
      return status.id == id
    })

    this.setState({
      name:editingItem.name
    })
  }

  update(e){
    e.preventDefault();
    let id=this.state.editMode;
    window.axios.put('/master/loan-status/'+id, {name:this.state.name})
    .then(response=>{
        console.log(response);
        this.fetchLoanstatus();
        this.setState({
          name:''
        })
    });
  }

  deleteStatus(id){
    // console.log('yo', id);
    window.axios.delete('/master/loan-status/'+id)
    .then(response=>{
      console.log(response);
      this.fetchLoanstatus();
    })
  }

  render() {
    const statusItem = this.state.loanstatus.map(status=>
      {
        return (
          <li key={status.id}>
            {status.name}
            <button onClick={this.deleteStatus.bind(this,status.id)}>Delete</button>
            <button onClick={this.editStatus.bind(this,status.id)}>Edit</button>
          </li>
        )
      }
    );

    return (
        <div className="App">
            <h4>Home</h4>
            <div>
              <h5>Create Loan Status</h5>
              <form onSubmit={this.submit}>
                <div>
                  <input type="text" name='name' value={this.state.name} placeholder="status" onChange={this.handelChange}/>
                </div>
                <input type="submit" value='submit'/>
              </form>
            </div>
            <div>
              <h5>Edit Loan Status</h5>
              <form onSubmit={this.update}>
                <div>
                  <input type="text" name='name' value={this.state.name} placeholder="status" onChange={this.handelChange}/>
                </div>
                <input type="submit" value='submit'/>
              </form>
            </div>
            <h5>Loan Status</h5>

            <ul>
              {statusItem}
            </ul>
        </div>
    );
  }
}

export default Home;
