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
      Location:''
    };
  
    this.writeDB = () =>{
        
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

        foodRef.push({
          Available: "Yes",
          Description: this.state.des,
          Image: "https://www.lecremedelacrumb.com/wp-content/uploads/2014/05/chicken-pad-thai-6.jpg",
          LatLng: "43.650748,-79.430531",
          Name: this.state.name,
          PickupTime: this.state.PickupTime,
          PrepareDate: new Date().toDateString(),
          Price: this.state.price,
          VendorAdress: this.state.Location,
          VendorId: sessionStorage.getItem("currentVendor")

        }).then(function(){
          console.log("data written successfully.");
          window.alert("You have added a food item successfully.");
        }).catch(function(error){
          console.log("error writing to the database: ",error);
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
      location: snap.val().Location
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

      //get current count of vendors on page load
      //possible issues with this if someone registers after it does the check 
      // let data = [];
      // const rootRef2 = firebase.database().ref().child('Vendor');
      // rootRef2.on('value',snap=>{    
      //   snap.forEach(ss =>{
      //     data.push(ss.val());
          
      //   });
      //   console.log(data.length);
      //   this.setState((prevState,props)=>({
      //       dbCount:data.length   
      //     }),()=>{
      //     console.log('check if correct: '+'0'+(this.state.dbCount+1).toString());
      //   });
      // });
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
        <input type="text" className="fadeIn1" placeholder="Pickup Time" name="pickup" ref="pickupTime" />
        </label>
        <label>
        <input type="text" className="fadeIn1" placeholder="Price" name="price" ref="price" />
        </label>
        <label>
        <input type="text" className="fadeIn1" placeholder="Description" name="des" ref="des"/>
        </label>
        <label>
        <input type="file" className="fadeIn3" placeholder="Address" name="pic" ref="pic" accept="image/*"/>
        </label>
        <input type="button" value="Add Item"onClick={this.writeDB.bind(this)}/>
        </form> 
     </div>
    );
  }
}

export default Addfood;
