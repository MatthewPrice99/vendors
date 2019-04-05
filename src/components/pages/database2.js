import React, { Component } from 'react';
import * as firebase from 'firebase';

class Database2 extends Component {

  constructor(){
    super();

    this.state = {
        data: {},
        collection:{},
        entry:{},
        name:{}
    };

//search

  } 
  componentDidMount(){

//get all from DB and populate form with on page load
   const rootRef = firebase.database().ref();
   let pops = [];
     rootRef.on('value',snap=>{  
       pops = snap.val()
    this.setState({data:pops});
       console.log(this.state.data['Food']['01']['Name']);


       this.addAll = ()=>{
       
       let col = [];
       let ent = [];
       let nam = [];

       for(let collection in this.state.data){
           col.push(collection);
           for(let entry in collection){
               ent.push(entry);
               for(let name in entry){
                   nam.push(name);
               }
           }   
       }
       this.setState({
           collection: col,
           entry:ent,
           name:nam
       });
    };
    this.addAll();
});
     
// this.searchDB = (x)=>{
// let results = [];
// let toSearch = x;
// for(var i=0; i<pops.length; i++) {
//   for(let key in pops[i]) {
//     if(pops[i][key].indexOf(toSearch)!=-1) {
//       results.push(pops[i]);
//     }
//   }
// }
// console.log(results);
// };

// this.searchDB('01');

}
  render() {
    return (
        <div className='container-fluid'>
            <h1>Admin Database</h1>
            <br/>
            {console.log(this.collection)}            
        </div>
        );
    }
}

export default Database2;