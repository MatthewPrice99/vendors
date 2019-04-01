import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

//components
import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Register from './components/pages/register';
import About from './components/pages/about';
import Update from './components/pages/update';

//includes
import './Assets/css/default.min.css'



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Header />
          <Route path ="/" exact strict render={
            ()=>{
              return <Homepage/>
              
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
              if(sessionStorage.getItem("loggedIn")){
                return <Update/>
              }
              else{        

                return <Redirect to ='/'></Redirect>
          
              }
            }
          }/> 

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
