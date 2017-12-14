import React, { Component } from 'react';
import logo from '../../logo.png';
import { NavLink } from 'react-router-dom';
import './Header.css';
import core from '../../core/core'

class Header extends Component {
  getNavClass = () => (this.props.showNav ? 'fa-arrow-left' : 'fa-bars')
  update = () => {
    core.getLocal();
  }
  render() {
    return (
      <header className="App-header">
        <i onClick={this.props.handleNavigation}
          className={`fa ${this.getNavClass()} fa-fw pointer`}></i>
        <NavLink to='/'>
          <img src={logo} style={{height: "60px", marginTop: "-20px"}}/>
        </NavLink>
        <div>
          <i onClick={this.update}
            className="fa fa-refresh fa-fw pointer"></i>
          <p>Last Sync: {core.getLocal('sync') || 'today'}</p>
        </div>
      </header>
    );
  }
}

export default Header;
