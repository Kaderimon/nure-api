import React, { Component } from 'react';

class Header extends Component {
  getNavClass = () => (this.props.showNav ? 'fa-arrow-left' : 'fa-bars')

  render() {
    return (
      <header className="App-header">
        <i onClick={this.props.handleNavigation} className={`fa ${this.getNavClass()} fa-fw`}></i>
        <h1 className="App-title">Welcome to NureAPI</h1>
        <i className="fa fa-refresh fa-fw"></i>
      </header>
    );
  }
}

export default Header;
