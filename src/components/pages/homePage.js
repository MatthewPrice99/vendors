import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import App from '../../App';
var bcrypt = require('bcryptjs');





console.log(sessionStorage.getItem("loggedIn"));
let message;
if(sessionStorage.getItem("loggedIn")!==true){
  console.log(sessionStorage.getItem("loggedIn"))
  message = "Please Enter Correct User/Password"
}

class Homepage extends Component {

  constructor(){
    super();

    this.state = {
      loggedIn:false,
      name : "",
      email: '',
      password: '',
      redirect: false,
      data: {},
      IDs: [],
      loaction1: []
    };

    
    

    this.loginHandle = () => {
      let counter = 0;
      for(var [key,value] of Object.entries(this.state.data)){   
      if(value['key'] === this.refs.email.value && bcrypt.compareSync(this.refs.pass.value, value['value'])){
        this.setState({loggedIn:true});
        sessionStorage.setItem("password",this.refs.pass.value);
        sessionStorage.setItem("currentVendor",this.state.IDs[counter]);
        sessionStorage.setItem("currentLocation",this.state.location1[counter]);
        sessionStorage.setItem("loggedIn","true");
        console.log("on click added: "+sessionStorage.getItem("loggedIn"));
        this.setState({redirect:true});
        window.location.reload();
        return;   
      }
      counter = counter+1
    };
    console.log("incorrect user/pass");
    window.alert('Account doesnt exist/Incorrect pass');    
  }
}
  componentDidMount(){

   const rootRef = firebase.database().ref().child('Vendor');
   const nameRef = rootRef.child('01').child('Name');
   const emailRef = rootRef.child('01').child('Email');
   const passwordRef = rootRef.child('01').child('Password');


   let uniqueIDs = [];
   let pops = [];
   let location = [];
   rootRef.on('value',snap=>{    
     snap.forEach(ss =>{
       pops.push({
         key: ss.val().Email,
         value: ss.val().Password
       });
       location.push(ss.val().Location);
       uniqueIDs.push(ss.key);
     });
     this.setState({data:pops,IDs:uniqueIDs});
     this.setState({location1:location});
    //  console.log(this.state.IDs);    
   });

      emailRef.on('value',snap => {
        this.setState({
          email: snap.val()
        });
      });
      passwordRef.on('value',snap => {
        this.setState({
          password: snap.val()
        });
      });
   
   nameRef.on('value',snap => {
     this.setState({
       name: snap.val()
     });
   });

//carousel control
// let myIndex = 0;
// carousel();

// function carousel() {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";  
//   }
//   myIndex++;
//   if (myIndex > x.length) {myIndex = 1}    
//   x[myIndex-1].style.display = "block";  
//   setTimeout(carousel, 4000); // Change image every 2 seconds
// }

  }

  render() {

    const { redirect } = this.state;
    if (redirect===true) {
      return <Redirect to=''/>;
    }

    return (
     <div className='container-fluid'> 
     {/* <div className="carousel">
  <img className="mySlides" src="https://cdn.doordash.com/media/restaurant/cover/BarqueSmokehouse_Toronto.png" ></img>
  <img className="mySlides" src="https://www.clubhalal.ca/wp-content/uploads/2018/10/dbfaaa7ff36d4ff58eaf0f3ac6ccbf01_D@2x.jpg" ></img>
  <img className="mySlides" src="https://static1.squarespace.com/static/5a137abae9bfdfb7768f2171/t/5a138421085229fa0466b7c9/1521162143029/designcrowd_609639_13403942_2516859_b4047929_image.png?format=1500w" ></img>
    </div> */}

   
        <form className='poop'> 
        <h1 className="title">Login</h1>
        <label>
        <input type="text" className="fadeIn1" placeholder="Email" name="email" ref="email" />
        </label>
        <br/>
        <label>
        <input type="password" placeholder="Password" className="fadeIn2" name="password" ref="pass" />
        </label>
        <br/>
        <input type="button" className="fadeIn2" value="Login" onClick={this.loginHandle.bind(this)} />
        </form>
        <br/>
        <div className="dbStuff">
        </div>
       
     </div>
    );
  }
}

export default Homepage;
