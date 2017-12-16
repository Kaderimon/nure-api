import React, { Component } from 'react';
import logo from '../../logo.png';
import { NavLink } from 'react-router-dom';
import './Header.css';
import core from '../../core/core';
import Transport from '../../core/Requester';
import Notify from '../../core/Notify';
import _ from 'lodash';

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
      Transport.post(`/api/${type}/${id}`).then((response)=>{
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
