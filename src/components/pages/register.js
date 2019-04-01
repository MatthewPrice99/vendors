import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';


class Register extends Component {
 
  render() {
    return (
     <div className='container-fluid'>
        <h1 className="title">Register</h1>

        <form className='poop'>
        <label>
        Email:
        <br/>
        <input type="text" placeholder="Email" name="email" />
        </label>
        <br/>
        <label>
        Password:
        <br/>
        <input type="text" placeholder="Password" name="password" />
        </label>
        <br/>
        <input type="submit" value="Submit" />
        </form>

      
     </div>
    );
  }
}

export default Register;
