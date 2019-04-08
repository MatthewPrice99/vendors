import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';


class Error extends Component {
 
  render() {
    return (
     <div className='container-fluid'>
        <h1 className="title">Page does not exist</h1>
      
     </div>
    );
  }
}

export default Error;
