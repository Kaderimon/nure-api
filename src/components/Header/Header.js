import React, { Component } from 'react';
import logo from '../../logo.png';
import { NavLink } from 'react-router-dom';
import './Header.css';
import core from '../../core/core';
import Transport from '../../core/Requester';
import { config } from '../../config/config.js';

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
    if(!this.state.update) {
      this.setState({
        update: true
      });
      Transport.post(`${config.apis.updater}${type}/${id}`).then((response)=>{
        this.setState({
          update: false
        });
      });      
    }
  }
  render() {
    const spin = this.state.update ? 'fa-spin' : '';
    return (
      <header className="App-header">
        <div className="App-logo">
          <NavLink to='/'>
            <img alt='NureApi' src={logo} style={{height: "60px", marginTop: "-20px", transform: 'rotate(-15deg)'}} />
          </NavLink>
          <i onClick={this.props.handleNavigation} className={`fa ${this.getNavClass()} fa-fw pointer`} />
        </div>
        <i onClick={this.update} className={`fa fa-refresh fa-fw pointer ${spin}`} />
      </header>
    );
  }
}

export default Header;
