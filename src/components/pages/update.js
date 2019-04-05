import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter, Redirect } from 'react-router-dom';


console.log('update page');
console.log("session storage holds: "+sessionStorage.getItem("loggedIn"))


   
class Update extends Component {
  constructor(){
    super();

    this.state ={
      email:'',
      image:'',
      location:'',
      restName:'',
      pickupMax:'',
      rating:''
    }
  }
  componentDidMount(){
    
    let currentVend = sessionStorage.getItem("currentVendor");
    if(currentVend === null){
      currentVend = "01"
    }
    const vendRef = firebase.database().ref().child('Vendor').child(currentVend);
    const foodRef = firebase.database().ref().child('Food');
    const catRef = firebase.database().ref().child('Category');

    vendRef.on('value',snap=>{    
        this.setState((prevState,props)=>({
          email: snap.val().Email,
          image: snap.val().Image,
          location: snap.val().Location,
          restName: snap.val().Name,
          pickupMax: snap.val().PickupMax,
          rating: snap.val().Rating
        }),()=>{
          //do stuff after
        });  
      });     
  }

  render() {
    return (

<div>
<h1 className="titleUpdate">Current Vendor Information</h1>
<table className="table table-dark">
  <thead>
    <tr>
      <th scope="col"><b>Restaurant name:</b></th>
      <th scope="col">{this.state.restName}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Email:</b></td>
      <td>{this.state.email}</td>
    </tr>
    <tr>
      <td><b>Displayed picture:</b></td>
      <td>{this.state.image}</td>
    </tr>
    <tr>
      <td><b>Address:</b></td>
      <td>{this.state.location}</td>
    </tr>
    <tr>
      <td><b>Max pickup time:</b></td>
      <td>{this.state.pickupMax}</td>
    </tr>
    <tr>
      <td><b>Rating:</b></td>
      <td>{this.state.rating}</td>
    </tr>
  </tbody>
</table>
</div>
    );
  }
}

export default Update;
