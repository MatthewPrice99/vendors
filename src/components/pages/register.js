import React, { Component } from 'react';
import * as firebase from 'firebase';
// import { BrowserRouter } from 'react-router-dom';


class Register extends Component {

  constructor(){
    super();

    this.state = {
      data: [],
      email:'',
      password:'',
      confirmpass:'',
      restname:'',
      address:'',
      cat:'',
      pic:null,
      dbCount:0,
      PickupMax: null
    };

    this.fileSelectedHandler = event =>{
      event.persist();
      this.setState(()=>({ 
        pic : event.target.files[0]
      }),()=>{
        console.log(this.state.pic)
      });
    }

    //get category from DB and populate form with
    const catRef = firebase.database().ref().child('Category');
    let pops = [];
      catRef.on('value',snap=>{    
        snap.forEach(ss =>{
          pops.push(ss.val().Name);
        });
        this.setState({data:pops});
      });
  
      this.writeDB = () =>{
      
      //assign catID
      let catId;
      if((this.state.data.indexOf(this.refs.cat.value)+1)<10){
        catId = '0'+(this.state.data.indexOf(this.refs.cat.value)+1).toString()
      }else{
        catId = (this.state.data.indexOf(this.refs.cat.value)+1).toString()
      }
        
        
      //set info based on submit
      this.setState((prevState,props)=>({
        email: this.refs.email.value,
        password:this.refs.pass.value,
        confirmpass:this.refs.passconfirm.value,
        restname:this.refs.restname.value,
        address:this.refs.address.value,
        cat: catId,
        PickupMax:this.refs.pickupTime.value

      }),()=>{
        //reset fields
        this.refs.address.value = '';
        this.refs.email.value = '';
        this.refs.pass.value = '';
        this.refs.passconfirm.value = '';
        this.refs.restname.value = '';

         //Upload picture
         const uploadTask = firebase.storage().ref(`images/${this.state.pic.name}`).put(this.state.pic);
         uploadTask.on('state_changed',(snapshot)=>{
           //progress
         },(error)=>{
           //error
           console.log(error);
         },()=>{
           //complete
           firebase.storage().ref(`images`).child(this.state.pic.name).getDownloadURL().then(url =>{
             console.log(url);
            const rootRef = firebase.database().ref().child('Vendor');
            if(this.state.password === this.state.confirmpass){
              console.log(this.state.returnURL);
              rootRef.push({
                CategoryId: this.state.cat,
                Email: this.state.email,
                Location: this.state.address,
                Name: this.state.restname,
                Password: this.state.password,
                Image: url,
                PickupMax: this.state.PickupMax,
                Rating: "3"       
              }).then(function(){
                console.log("data written successfully.");
                window.alert("You have registered successfully.");
              }).catch(function(error){
                console.log("error writing to the database: ",error);
              });
            }
            else{
              window.alert("Please make sure both passwords are the same.");
              console.log("Passwords dont match.");
            }
            });
           });
         });

       
    }   
  }
  componentDidMount(){
    //get category from DB and populate form with on page load
   const catRef = firebase.database().ref().child('Category');
   let pops = [];
     catRef.on('value',snap=>{    
       snap.forEach(ss =>{
         pops.push(ss.val().Name);
       });
       this.setState({data:pops});
     });

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
        <label>
          Max Pickup Time        
          <select ref="pickupTime" placeholder="Max Pickup Time" className="dropBox"> 
          <option value="7:00pm">7:00pm</option>
          <option value="7:30pm">7:30pm</option>
          <option value="8:00pm">8:00pm</option>
          <option value="8:30pm">8:30pm</option>
          <option value="9:00pm">9:00pm</option>
          <option value="9:30pm">9:30pm</option>
          <option value="10:00pm">10:00pm</option>
          <option value="10:30pm">10:30pm</option>
          <option value="11:00pm">11:00pm</option>
          <option value="11:30pm">11:30pm</option>
          <option value="12:00am">12:00am</option>
          <option value="1:00am">1:00am</option>
        </select>
        </label>
        <label>
        <input type="file" className="fadeIn3" placeholder="Address" name="pic" ref="pic" accept="image/*" onChange={this.fileSelectedHandler}/>
        </label>
        <br/>
        Select type of food <select className="dropBox" ref="cat">{this.state.data.map((x,y) => <option key={y+1}>{x}</option>)}</select>
        <br/>
        <input type="button" value="Register" className="fadeIn2" onClick={this.writeDB.bind(this)}/>
        </form> 
     </div>
    );
  }
}

export default Register;
