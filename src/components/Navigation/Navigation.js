import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import './Navigation.css';

class Nav extends Component {
  handleClickOutside = evt => {
    this.props.handleNavigation(false);
  };
  render() {
    return (
      <nav className="App-nav" style={this.props.style}>
          <ul>
            <li className="App-nav__item">
              <NavLink onClick={this.handleClickOutside} to='/'>Главная</NavLink>
            </li>
            <li className="App-nav__item">
              <NavLink to='/teachers' onClick={this.handleClickOutside}>Преподаватель</NavLink>
            </li>
            <li className="App-nav__item">
              <NavLink to='/groups' onClick={this.handleClickOutside} >Студент</NavLink>
            </li>
          </ul>
      </nav>
    );
  }
}

export default onClickOutside(Nav);
