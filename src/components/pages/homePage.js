import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';







console.log(sessionStorage.getItem("loggedIn"));
var message = '';
if(sessionStorage.getItem("loggedIn")!=true){
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
      password: ''
    };

    // async function updatestate(){
    //   const rootRef = firebase.database().ref().child('Vendor');
    //   const emailRef = rootRef.child('01').child('Email');
    //   const passwordRef = rootRef.child('01').child('Password');
    //   console.log('email and pass are: '+ this.state.email,this.state.password);

    //    emailRef.on('value',snap => {
    //     this.setState({
    //       email: snap.val()
    //     });
    //   });

    //   passwordRef.on('value',snap => {
    //     this.setState({
    //       password: snap.val()
    //     });
    //   });
  
    // }


    this.loginHandle = () => {
      // await updatestate();
      
      // const rootRef = firebase.database().ref().child('Vendor');
      // const emailRef = rootRef.child('01').child('Email');
      // const passwordRef = rootRef.child('01').child('Password');

      

      // emailRef.on('value',snap => {
      //   this.setState({
      //     email: snap.val()
      //   });
      // });
      // passwordRef.on('value',snap => {
      //   this.setState({
      //     password: snap.val()
      //   });
      // });

      console.log('email and pass are: '+ this.state.email,this.state.password);
    

      if(this.state.email === this.refs.email.value && this.state.password === this.refs.pass.value){
        this.setState({loggedIn:true})   
        sessionStorage.setItem("loggedIn",true)
        console.log(sessionStorage.getItem("loggedIn"));
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
    return (
     <div className='container-fluid'>
        <h1 className="title">Login</h1>

        <form className='poop'>
        <label>
        Email:
        <br/>
        <input type="text" placeholder="Email" name="email" ref="email" />
        </label>
        <br/>
        <label>
        Password:
        <br/>
        <input type="password" placeholder="Password" name="password" ref="pass" />
        </label>
        <br/>
        <input type="button" value="Login" onClick={this.loginHandle.bind(this)} />
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
