import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter, Redirect } from 'react-router-dom';


console.log('update page');
console.log("session storage holds: "+sessionStorage.getItem("loggedIn"))


   
class Update extends Component {

  render() {
    return (
     <div className='container-fluid'>
        <h1 className="title">Update</h1>

      
     </div>
    );
  }
}

export default Update;
