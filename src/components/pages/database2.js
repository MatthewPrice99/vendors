import React, { Component } from 'react';
import * as firebase from 'firebase';

class Database2 extends Component {

  constructor(props){
    super();

    this.state = {
        tech: 'select',
        category: '',
        food: '',
        request: '',
        user: '',
        name: '',
        vendor: '',
        catArr: [],
        foodArr: [],
        ratingArr: [],
        requestArr: [],
        userArr: [],
        vendorArr: [],
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

    this.searchDB = () => {
        const jsonObj = document.getElementById('jsonObj');
        const dbsRef = firebase.database().ref().child(this.state.tech)
        const dbsRef2 = firebase.database().ref().child(this.state.tech).child('Name');
        // if (dbsRef.child('Name') === this.state.name) {
        //     dbsRef = dbsRef.child(this.state.name)
        // }
        // switch (this.state.name) {
        //     case dbsRef2

        // }

        dbsRef.on('value',snap=>{
            const jsonDb2 = JSON.stringify(snap.val(), null, 3);
            console.log(jsonDb2);
            jsonObj.innerText = JSON.stringify(snap.val(), null, 3);
            console.log('Child of child ' + JSON.stringify(snap.val(), null, 3));
        })

        dbsRef2.on('value',snap=>{
            const jsonDb2 = JSON.stringify(snap.val(), null, 3);
            console.log(jsonDb2);
        })
    }

    this.editDB = () => {
        const jsonObj = document.getElementById('jsonObj');
        const dbsRef = firebase.database().ref().child(this.state.tech)

    }

    this.deleteDB = () => {
        

    }

    this.optSel = (e) => {
        this.setState((prevState, props) => ({
            tech: this.refs.dropBox.value
        }), () => {
            console.log("state of select " + this.state.tech);
        });
    }

        // this.optSel = (e) => {
        //     this.setState((prevState, props) => ({
        //         tech: e.target.value
        //     }), () => {
        //         console.log("state of select" + this.state.tech)
        //     })
        // }   
  } 

  render() {
    return (
        <div className='container-fluid'>
            <h1>Admin 2 JSON</h1>
            <hr></hr>
            <form>
                <select id="choose" ref="dropBox" onChange={this.optSel.bind(this)} value={this.state.tech}>
                    <option value="Category" ref="opt">Category</option>
                    <option value="Food" ref="opt">Food</option>
                    <option value="Rating" ref="opt">Rating</option>
                    <option value="Requests" ref="opt">Requests</option>
                    <option value="User" ref="opt">User</option>
                    <option value="Vendor" ref="opt">Vendor</option>
                </select>  
                <input type="text" className="fadeIn1" placeholder="Search" name="name" ref="name"></input>
                <input type="button" value="Search" onClick={this.searchDB.bind(this)}/>
                <input type="button" value="Add" onClick={this.writeDB.bind(this)}/>
                <input type="button" value="Edit" onClick={this.editDB.bind(this)}/>
                <input type="button" value="Delete" onClick={this.deleteDB.bind(this)}/>
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