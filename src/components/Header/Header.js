import React, { Component } from 'react';
import logo from '../../logo.png';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  getNavClass = () => (this.props.showNav ? 'fa-arrow-left' : 'fa-bars')

  render() {
    return (
      <header className="App-header">
        <i onClick={this.props.handleNavigation}
          className={`fa ${this.getNavClass()} fa-fw pointer`}></i>
        <NavLink to='/'>
          <img src={logo} style={{height: "60px", marginTop: "-20px"}}/>
        </NavLink>
        <i className="fa fa-refresh fa-fw pointer"></i>
      </header>
    );
  }
}

export default Header;
