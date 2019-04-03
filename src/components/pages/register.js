import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';




class Register extends Component {

  constructor(){
    super();

    this.state = {
      email:'',
      password:'',
      confirmpass:'',
      restname:'',
      address:''
    };
  }

  componentDidMount(){

    const rootRef = firebase.database().ref().child('Vendor');
    const nameRef = rootRef.child('01').child('Name');
    const emailRef = rootRef.child('01').child('Email');
    const passwordRef = rootRef.child('01').child('Password');

    
  }
 
  render() {
    return (
     <div className='container-fluid'>       
        <form className='poop'>
        <h1 className="title">Register</h1>
        <label>
        <input type="email" className="fadeIn1" placeholder="Email" name="email" />
        </label>
        <label>
        <input type="password" className="fadeIn1" placeholder="Password" name="password" />
        </label>
        <label>
        <input type="password" className="fadeIn1" placeholder="Confirm Password" name="password2" />
        </label>
        <label>
        <input type="text" className="fadeIn1" placeholder="Restaurant Name" name="name" />
        </label>
        <label>
        <input type="text" className="fadeIn1" placeholder="Address" name="address" />
        </label>
        <br/>
        <input type="submit" value="Submit" />
        </form> 
     </div>
    );
  }
}

export default Register;
