import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './Navigation.css'

class Nav extends Component {
  render() {
    return (
      <nav className="App-nav">
          <ul>
            <li className="App-nav__item"><NavLink to='/'>Home</NavLink></li>
            <li className="App-nav__item"><NavLink to='/students'>Students</NavLink></li>
            <li className="App-nav__item"><NavLink to='/teachers'>Teachers</NavLink></li>
            <li className="App-nav__item"><NavLink to='/groups'>Groups</NavLink></li>
          </ul>
      </nav>
    );
  }
}

export default Nav;
