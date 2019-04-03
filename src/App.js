import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Register from './components/pages/register';
import About from './components/pages/about';
import Update from './components/pages/update';
import Header2 from './components/headerComponent/header2';


//includes
import './Assets/css/default.min.css'
console.log('sessionstorage:'+sessionStorage.getItem("loggedIn"));



class App extends Component {
  
 
  render() {
    //declare what nav I want
    let navbar;

    if(sessionStorage.getItem("loggedIn")==="true"){
      navbar = <Header2/>
    }
    else{
      navbar = <Header/>
    }

    return (
      <BrowserRouter>
        <div className="App">
        {navbar}

          <Route path ="/" exact strict render={
            ()=>{
              if(sessionStorage.getItem("loggedIn")==="true"){
                return <Update/>
              }else{
                return <Homepage/>

              }              
            }
          }/> 

          <Route path ="/register" exact strict render={
            ()=>{
              return <Register/>
            }
          }/> 
          
          <Route path ="/about" exact strict render={
            ()=>{
              return <About/>
            }
          }/> 
          <Route path ="/update" exact strict render={
            ()=>{
              console.log(sessionStorage.getItem("loggedIn"));
              if(sessionStorage.getItem("loggedIn")==="true"){
                console.log('you have logged in returning update page');
                return <Update/>
              }
              else{        
                console.log("you must log in to visit this page");
                return <Redirect to='/' />
          
              }
            }
          }/> 

          <Route path ="/logout" exact strict render={
              ()=>{
                sessionStorage.setItem("loggedIn",false);
                navbar = <Header/>
                return <Redirect to='/' />
              }
           }/> 

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
