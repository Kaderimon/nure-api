import React, { Component } from 'react';
import Nav from '../Navigation/Navigation';
import Header from '../Header/Header';

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false
    }
  }

  handleNavigation = (status) => {
    this.setState({
      showNav: status
    });
  }

  render() {
    const showNav = this.state.showNav ? { left:0 } : {};
    return (
      <div>
        <Header showNav={this.state.showNav} handleNavigation={this.handleNavigation}/>
        <Nav style={showNav} handleNavigation={this.handleNavigation}/>
      </div>
    );
  }
}

export default Top;