import React, { Component } from 'react';
import * as firebase from 'firebase';
// import { BrowserRouter } from 'react-router-dom';




class Addfood extends Component {

  constructor(){
    super();

    this.state = {
      data: [],
      name:'',
      pickupTime:'',
      des:'',
      price:'',
      Location:'',
      pic: null,
      displayPic:null
    };

    //Upload handler

    this.fileSelectedHandler = event =>{
      event.persist();
      this.setState(()=>({ 
        pic : event.target.files[0]
      }),()=>{
        console.log(this.state.pic)
      });
    }
  
    this.writeDB = () =>{
      const vendRef = firebase.database().ref().child('Vendor').child(sessionStorage.getItem("currentVendor"));     
      //set info based on submit
      this.setState((prevState,props)=>({
        name: this.refs.name.value,
        PickupTime: this.refs.pickupTime.value,
        des: this.refs.des.value,
        price: this.refs.price.value
        
      }),()=>{
        //reset fields
        this.refs.name.value = '';
        this.refs.pickupTime.value = '';
        this.refs.des.value = '';
        this.refs.price.value = '';
        const foodRef = firebase.database().ref().child('Food');

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
            foodRef.push({
              Available: "Yes",
              Description: this.state.des,
              Image: url,
              LatLng: "43.650748,-79.430531",
              Name: this.state.name,
              PickupTime: this.state.PickupTime,
              PrepareDate: new Date().toDateString(),
              Price: this.state.price,
              VendorAdress: this.state.location,
              VendorId: sessionStorage.getItem("currentVendor")

            }).then(function(){
              console.log("data written successfully.");
              window.alert("You have added a food item successfully.");
            }).catch(function(error){
              console.log("error writing to the database: ",error);
            });  
          });
        });
      });

      
    }   
  }
  componentDidMount(){
    //get category from DB and populate form with on page load
   const catRef = firebase.database().ref().child('Category');
   const vendRef = firebase.database().ref().child('Vendor').child(sessionStorage.getItem("currentVendor"));

   vendRef.on('value',snap=>{    
    this.setState((prevState,props)=>({  
      location: snap.val().Location,
      displayPic: snap.val().Image
    }),()=>{
      //do stuff after
    });  
  }); 

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
        <h2 className="title">Add Food Item</h2>
        <label>
        <input type="text" className="fadeIn1" placeholder="Item Name" name="name" ref="name" />
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
        <input type="text" className="fadeIn1" placeholder="Price" name="price" ref="price" />
        </label>
        <label>
        <div className="form-group">
          <textarea className="form-control" id="exampleFormControlTextarea3" placeholder ="Describe the food item here..." rows="7" ref="des"></textarea>
        </div>
        </label>
        <label>
        <input type="file" className="fadeIn3" placeholder="Address" name="pic" ref="pic" accept="image/*" onChange={this.fileSelectedHandler}/>
        </label>
        <input type="button" className="fadeIn4" value="Add Item"onClick={this.writeDB.bind(this)}/>
        </form>
     </div>
    );
  }
}

export default Addfood;
