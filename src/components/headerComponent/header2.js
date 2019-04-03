import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header2 extends Component {
  render() {
    return (
     <header>
         <div className = "logo">
         <img src="https://www.ericholscher.com/_images/pacman.png" alt="pacman" width="50" height="50"></img>
         </div>

         <nav>
             <ul>
                 <li className="first">
                    <NavLink to='/' exact activeStyle={
                        {color : 'red'}
                    }>Home</NavLink>
                 </li>
                 <li>
                    <NavLink to='/update' exact activeStyle={
                        {color : 'red'}
                    }>Update Items</NavLink>
                 </li>

                 
                 <li className ="logout">
                    <NavLink to='/logout' exact activeStyle={
                        {color : 'red'}
                    }>Logout</NavLink>
                 </li>
             </ul>
         </nav>



     </header>
    );
  }
}

export default Header2;
