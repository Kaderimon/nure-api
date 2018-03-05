import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import './Navigation.css';

class Nav extends Component {
  render() {
    return (
      <nav className="App-nav" style={this.props.style}>
        <NavLink to='/teachers'>
          <i className="fa fa-graduation-cap"></i>
          Преподаватели
        </NavLink>
        <NavLink to='/groups'>
          <i className="fa fa-users"></i>
          Группы
        </NavLink>
        <NavLink to='/auditories'>
          <i className="fa fa-slideshare"></i>
          Аудитории
        </NavLink>
      </nav>
    );
  }
}

export default Nav;
