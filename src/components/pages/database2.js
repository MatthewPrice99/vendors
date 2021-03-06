import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter, Redirect, Link } from 'react-router-dom';

class Database2 extends Component {

  constructor(props){
    super();

    this.state = {
        tech: '',
        category: '',
        food: '',
        request: '',
        user: '',
        name: '',
        vendor: '',
        dbCount: 0
    };

    this.writeDB = () => {
      var data = [];
      this.setState((prevState, props) => ({
        category: this.refs.cat.value,
        dbCount: data.length
      }), () => {
        console.log('testing: '+'0'+(this.state.dbCount+1).toString());
        const catRef2 = firebase.database().ref().child(this.state.tech).child('0'+(this.state.dbCount+1).toString());
        catRef2.set({
          CategoryId: this.state.cat,
          Food: this.state.food        
        }).then(function(){
          console.log("data written successfully.")
        }).catch(function(error){
          console.log("error writing to the database: ",error);
        });
      });
    }

    this.handleChange = (e) => {
      this.setState({name: this.refs.name.value});
    }

    this.searchDB = () => {
      const jsonObj = document.getElementById('jsonObj');
      const vendRef = firebase.database().ref().child('Vendor');
      console.log(this.state.tech);
      if (this.state.tech === '') {
        window.alert('Please choose a category from the drop down list first.');
      }
      else {
        const dbsRef = firebase.database().ref().child(this.state.tech)
      if(this.refs.name.value){
        let found = 'a';
        let data = [];
        //search based on input
        dbsRef.on('value',snap=>{
          snap.forEach(ss =>{
            data = Object.values(ss.val())
            data.forEach(x =>{
              if(this.refs.name.value.toLowerCase() === x.toLowerCase()){
                found = ss.key;
              } 
            });
          });
          // dbsRef.child(found).on('value',snap=>{
          // jsonObj.innerText = JSON.stringify(snap.val(), null, 3);
          // });
      });
      dbsRef.child(found).on('value',snap=>{
        jsonObj.innerText = JSON.stringify(snap.val(), null, 3);
        sessionStorage.setItem("path", found);
      });
      
      }else{
        //set jsonObj text all
        dbsRef.on('value',snap=>{
        jsonObj.innerText = JSON.stringify(snap.val(), null, 3);
      });
      }
      }
      // const jsonObj = document.getElementById('jsonObj');
      // const vendRef = firebase.database().ref().child('Vendor');
      // var keys = 0;
      // var found = false;
      // var searchName = this.state.name;
      // console.log(searchName);
      // var newName = '';
      // vendRef.once('value').then(function(vendSnapshot) {
      //   return vendSnapshot.forEach(function(vendSnapshot) {
      //     keys = vendSnapshot.val();
      //     newName = keys.Name.toLowerCase();
      //     if (newName === searchName.toLowerCase()){
      //       console.log('New Match ' + newName.toLowerCase() + ' ' + searchName.toLowerCase());
      //       const nameRef = firebase.database().ref().child('Vendor').child('02');
      //       nameRef.on('value', snap => {
      //         jsonObj.innerText = JSON.stringify(snap.val(), null, 3);
      //       });
      //       found = true;
      //     }
      //   });
      // });
      // dbsRef.on('value', snap=> {
      //   jsonObj.innerText = JSON.stringify(snap.val(), null, 3);
      // })
    }
    
    this.optSel = (e) => {
        this.setState((prevState, props) => ({
            tech: this.refs.dropBox.value
        }), () => {
          console.log("state of select " + this.state.tech);
          const dbsRef = firebase.database().ref().child(this.state.tech);
          const jsonObj = document.getElementById('jsonObj');
          dbsRef.on('value', snap => {
            jsonObj.innerText = JSON.stringify(snap.val(), null, 3);
          });
        });
    }

    this.editDB = (e) => {
      if (this.state.tech !== 'Vendor') {
        window.alert('Please search for a vendor to edit');
        e.preventDefault();
      }
    }
  } 

  render() {
    return (
        <div className='container-fluid'>
            <h1>Admin 2 JSON</h1>
            <hr></hr>
            <form>
                <select id="choose" ref="dropBox" onChange={this.optSel.bind(this)} value={this.state.tech}>
                    <option defaultValue="Category" value="Category" ref="opt">Category</option>
                    <option value="Food" ref="opt">Food</option>
                    <option value="Rating" ref="opt">Rating</option>
                    <option value="Requests" ref="opt">Requests</option>
                    <option value="User" ref="opt">User</option>
                    <option value="Vendor" ref="opt">Vendor</option>
                </select>  
                <input type="text" className="fadeIn1" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Search for vendor" ref="name"></input>
                <input type="button" value="Search" onClick={this.searchDB.bind(this)}/>
                <Link to="/edit"><button type="button" value="Edit" onClick={this.editDB.bind(this)}>Edit</button></Link>
                </form>
            <hr></hr>
            <div id="jsonObj"></div>
        </div>
        );
    }

    componentDidMount(){
        const db = firebase.database();
        const dbRef = db.ref();
        const categoryRef = db.ref().child('Category');
        const foodRef = db.ref().child('Food');
        const ratingRef = db.ref().child('Rating');
        const requestRef = db.ref().child('Requests');
        const userRef = db.ref().child('User');
        const vendorRef = db.ref().child('Vendor');
        
        const jsonObj = document.getElementById('jsonObj');

        dbRef.on('value',snap=>{
            jsonObj.innerText = JSON.stringify(snap.val(), null, 3);
        })
    }
}

export default Database2;