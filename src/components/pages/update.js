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
     <div className='container-fluid'>
        <h1 className="title">Update</h1>
        <br/>
        Welcome back {this.state.restName}
        <br/>
        <h2><b>Current Information</b></h2>
        <br/>
        Email: {this.state.email}
        <br/>
        Displayed picture: <img src= {this.state.image} alt="restPic"></img>
        <br/>
        Address: {this.state.location}
        <br/>
        Restaurant name: {this.state.restName}
        <br/>
        Max pickup time: {this.state.pickupMax}
        <br/>
        Rating: {this.state.rating}
      
     </div>
    );
  }
}

export default Update;
