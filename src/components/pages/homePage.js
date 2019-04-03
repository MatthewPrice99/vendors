import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import App from '../../App';







console.log(sessionStorage.getItem("loggedIn"));
let message;
if(sessionStorage.getItem("loggedIn")!==true){
  console.log(sessionStorage.getItem("loggedIn"))
  message = "Please Enter Correct User/Password"
}

class Homepage extends Component {

  constructor(){
    super();

    this.state = {
      loggedIn:false,
      name : "",
      email: '',
      password: '',
      redirect: false
    };

    this.loginHandle = () => {

      if(this.state.email === this.refs.email.value && this.state.password === this.refs.pass.value){
        this.setState({loggedIn:true})   
        sessionStorage.setItem("loggedIn","true")
        console.log("on click added: "+sessionStorage.getItem("loggedIn"));
        this.setState({redirect:true});
        window.location.reload();
        
      }else{

        console.log("incorrect user/pass");       

      }    
    }
  }
  componentDidMount(){

   const rootRef = firebase.database().ref().child('Vendor');
   const nameRef = rootRef.child('01').child('Name');
   const emailRef = rootRef.child('01').child('Email');
   const passwordRef = rootRef.child('01').child('Password');

      

      emailRef.on('value',snap => {
        this.setState({
          email: snap.val()
        });
      });
      passwordRef.on('value',snap => {
        this.setState({
          password: snap.val()
        });
      });
   
   nameRef.on('value',snap => {
     this.setState({
       name: snap.val()
     });
   });
  }

  render() {

    const { redirect } = this.state;
    if (redirect===true) {
      return <Redirect to=''/>;
    }

    return (
     <div className='container-fluid'>
       

        <form className='poop'> 
        <h1 className="title">Login</h1>
        <label>
        <input type="text" className="fadeIn1" placeholder="Email" name="email" ref="email" />
        </label>
        <br/>
        <label>
        <input type="password" placeholder="Password" className="fadeIn2" name="password" ref="pass" />
        </label>
        <br/>
        <input type="button" className="fadeIn3" value="Login" onClick={this.loginHandle.bind(this)} />
        </form>
        <br/>
        <div className="dbStuff">
        
        {this.state.name}
        <br/>
        {this.state.email}
        <br/>
        {this.state.password}
        </div>
       

      
     </div>
    );
  }
}

export default Homepage;
