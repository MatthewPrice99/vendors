import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
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
                    }>Login</NavLink>
                 </li>
                 <li>
                    <NavLink to='/register' exact activeStyle={
                        {color : 'red'}
                    }>Register</NavLink>
                 </li>
                 <li>
                    <NavLink to='/about' exact activeStyle={
                        {color : 'red'}
                    }>About</NavLink>
                 </li>

                 <li className ="last">
                    <NavLink to='/update' exact activeStyle={
                        {color : 'red'}
                    }>Update items</NavLink>
                 </li>
             </ul>
         </nav>



     </header>
    );
  }
}

export default Header;
