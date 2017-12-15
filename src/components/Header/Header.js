import React, { Component } from 'react';
import logo from '../../logo.png';
import { NavLink } from 'react-router-dom';
import './Header.css';
import core from '../../core/core'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    }
  }
  getNavClass = () => (this.props.showNav ? 'fa-arrow-left' : 'fa-bars')
  update = () => {
    const {id, type} = core.getLocal('event');
    console.log(id, type);
    this.setState({
      update: true
    })
  }
  render() {
    const spin = this.state.update ? 'fa-spin' : '';
    return (
      <header className="App-header">
        <i onClick={this.props.handleNavigation}
          className={`fa ${this.getNavClass()} fa-fw pointer`}></i>
        <NavLink to='/'>
          <img src={logo} style={{height: "60px", marginTop: "-20px"}}/>
        </NavLink>
          <i onClick={this.update}
            className={`fa fa-refresh fa-fw pointer ${spin}`}></i>
      </header>
    );
  }
}

export default Header;
