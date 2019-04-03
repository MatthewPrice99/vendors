import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';




class Register extends Component {

  constructor(){
    super();

    this.state = {
      data: ['GROCERIES','VEGETARIAN','ITALIAN','CHINESE','THAI','AMERICAN','HALAL','MEXICAN','BAKERY','INDIAN','EUROPEAN'],
      email:'',
      password:'',
      confirmpass:'',
      restname:'',
      address:'',
      cat:'',
      random:''
    };

    this.writeDB = () =>{
      //set info based on submit
      this.setState((prevState,props)=>({
        email: this.refs.email.value,
        password:this.refs.pass.value,
        confirmpass:this.refs.passconfirm.value,
        restname:this.refs.restname.value,
        address:this.refs.address.value,
        cat:this.refs.cat.value,

      }),()=>{
       const rootRef = firebase.database().ref().child('Vendor').child('01');
      if(this.state.email === 'testcase@gmail.com'){
        console.log("confirmed email is: ",this.state.email);
        rootRef.set({
          CategoryId: this.state.cat,
          Email: this.state.email,
          Location: this.state.address,
          Name: this.state.restname,
          Password: this.state.password         
        }).then(function(){
          console.log("data written successfully.")
        }).catch(function(error){
          console.log("error writing to the database: ",error);
        });
      }
      else{
        console.log("incorrect email for testing.",this.state.email);
      }
      });
    }   
  }

  
 
  render() {
    return (
     <div className='container-fluid'>       
        <form className='poop'>
        <h1 className="title">Register</h1>
        <label>
        <input type="email" className="fadeIn1" placeholder="Email" name="email" ref="email" />
        </label>
        <label>
        <input type="password" className="fadeIn1" placeholder="Password" name="password" ref="pass" />
        </label>
        <label>
        <input type="password" className="fadeIn1" placeholder="Confirm Password" name="password2" ref="passconfirm" />
        </label>
        <label>
        <input type="text" className="fadeIn1" placeholder="Restaurant Name" name="name" ref="restname" />
        </label>
        <label>
        <input type="text" className="fadeIn1" placeholder="Address" name="address" ref="address" />
        </label>
        <br/>
        Select type of food <select ref="cat">{this.state.data.map((x,y) => <option key={y}>{x}</option>)}</select>
        <br/>
        <input type="button" value="Register"onClick={this.writeDB.bind(this)}/>
        </form> 
     </div>
    );
  }
}

export default Register;
