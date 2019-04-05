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
      rating:'',
      password: ''
    }

  //improve rating function
  this.improve = ()=>{
  window.alert("Make better food idiot");
  };

  //update database methods

  //Update rest Name
  this.updateInfoName = ()=>{
    //assign root ref for DB
    let currentVend = sessionStorage.getItem("currentVendor");
    if(currentVend === null){
      currentVend = "01"
    }
    const vendRef = firebase.database().ref().child('Vendor').child(currentVend);
    //get new updated data
    let newInfo = prompt("Please enter updated information.", this.state.restName);
    //console it to make sure
    console.log(newInfo);
    //update DB
    vendRef.update({
      Name: newInfo
    },function(error){
      if(error){
        console.log('failed to update',error);
      }else{
        console.log('database update successful.');
      }
    });
  };

    //Update Email Name
  this.updateInfoEmail = ()=>{
   //assign root ref for DB
   let currentVend = sessionStorage.getItem("currentVendor");
   if(currentVend === null){
     currentVend = "01"
   }
   const vendRef = firebase.database().ref().child('Vendor').child(currentVend);
   //get new updated data
   let newInfo = prompt("Please enter updated information.", this.state.email);
   //console it to make sure
   console.log(newInfo);
   //update DB
   vendRef.update({
     Email: newInfo
   },function(error){
     if(error){
       console.log('failed to update',error);
     }else{
       console.log('database update successful.');
     }
   });
  };

  //Update Address Name
  this.updateInfoAddress = ()=>{
    //assign root ref for DB
    let currentVend = sessionStorage.getItem("currentVendor");
    if(currentVend === null){
      currentVend = "01"
    }
    const vendRef = firebase.database().ref().child('Vendor').child(currentVend);
    //get new updated data
    let newInfo = prompt("Please enter updated information.", this.state.location);
    //console it to make sure
    console.log(newInfo);
    //update DB
    vendRef.update({
      Location: newInfo
    },function(error){
      if(error){
        console.log('failed to update',error);
      }else{
        console.log('database update successful.');
      }
    });
  };

  //Update Image Name
  this.updateInfoImage = ()=>{
   //assign root ref for DB
   let currentVend = sessionStorage.getItem("currentVendor");
   if(currentVend === null){
     currentVend = "01"
   }
   const vendRef = firebase.database().ref().child('Vendor').child(currentVend);
   //get new updated data
   let newInfo = prompt("Please enter updated information.", this.state.image);
   //console it to make sure
   console.log(newInfo);
   //update DB
   vendRef.update({
     Image: newInfo
   },function(error){
     if(error){
       console.log('failed to update',error);
     }else{
       console.log('database update successful.');
     }
   });
  };

  //Update PickupTime Name
  this.updateInfoPickup = ()=>{
    //assign root ref for DB
    let currentVend = sessionStorage.getItem("currentVendor");
    if(currentVend === null){
      currentVend = "01"
    }
    const vendRef = firebase.database().ref().child('Vendor').child(currentVend);
    //get new updated data
    let newInfo = prompt("Please enter updated information.", this.state.pickupMax);
    //console it to make sure
    console.log(newInfo);
    //update DB
    vendRef.update({
      PickupMax: newInfo
    },function(error){
      if(error){
        console.log('failed to update',error);
      }else{
        console.log('database update successful.');
      }
    });
  };

  //Update Password Name
  this.updateInfoPassword = ()=>{
  //assign root ref for DB
  let currentVend = sessionStorage.getItem("currentVendor");
  if(currentVend === null){
    currentVend = "01"
  }
  const vendRef = firebase.database().ref().child('Vendor').child(currentVend);
  //get new updated data
  let newInfo = prompt("Please enter updated information.", this.state.password);
  //console it to make sure
  console.log(newInfo);
  //update DB
  vendRef.update({
    Password: newInfo
  },function(error){
    if(error){
      console.log('failed to update',error);
    }else{
      console.log('database update successful.');
    }
  });
  };
  

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
          rating: snap.val().Rating,
          password: snap.val().Password
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
      <th scope="col"><input type="button" value="Edit Information" className="fadeIn2" ref="Name" onClick={this.updateInfoName.bind(this)}/></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Email:</b></td>
      <td>{this.state.email}</td>
      <td><input type="button" value="Edit Information" className="fadeIn2" ref="Email" onClick={this.updateInfoEmail.bind(this)}/></td>
    </tr>
    <tr>
      <td><b>Displayed picture:</b></td>
      <td>{this.state.image}</td>
      <td><input type="button" value="Edit Information" className="fadeIn2" ref="Image" onClick={this.updateInfoImage.bind(this)}/></td>
    </tr>
    <tr>
      <td><b>Address:</b></td>
      <td>{this.state.location}</td>
      <td><input type="button" value="Edit Information" className="fadeIn2" ref="Location" onClick={this.updateInfoAddress.bind(this)}/></td>
    </tr>
    <tr>
      <td><b>Max pickup time:</b></td>
      <td>{this.state.pickupMax}</td>
      <td><input type="button" value="Edit Information" className="fadeIn2" ref="PickupMax" onClick={this.updateInfoPickup.bind(this)}/></td>   
    </tr>
    <tr>
      <td><b>Password:</b></td>
      <td>{this.state.password}</td>
      <td><input type="button" value="Edit Information" className="fadeIn2" ref="Password" onClick={this.updateInfoPassword.bind(this)}/></td>   
    </tr>
    <tr>
      <td><b>Rating:</b></td>
      <td>{this.state.rating}</td>
      <td><input type="button" value="How can I improve this?" className="fadeIn2" ref="help" onClick={this.improve.bind(this)}/></td>   
    </tr>
  </tbody>
</table>
</div>
    );
  }
}

export default Update;
