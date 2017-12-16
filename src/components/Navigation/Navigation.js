import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

class Nav extends Component {
  render() {
    return (
      <nav className="App-nav" style={this.props.style}>
          <ul>
            <li className="App-nav__item"><NavLink to='/'>Главная</NavLink></li>
            <li className="App-nav__item"><NavLink to='/teachers'>Преподаватель</NavLink></li>
            <li className="App-nav__item"><NavLink to='/groups'>Студент</NavLink></li>
          </ul>
      </nav>
    );
  }
}

export default Nav;
