import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Nav from '../../components/Navigation/Navigation'
import Header from '../../components/Header/Header'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      updateDB: false
    }
  }

  handleNavigation = (e) => {
    this.setState({
      showNav: !this.state.showNav
    });
  }

  render() {
    return (
      <div className="App">
        <Header showNav={this.state.showNav} handleNavigation={this.handleNavigation}/>
        {this.state.showNav && <Nav />}
        {this.props.children}
        <footer className="App-footer">
          <p className="App-copy">Shupyliuk M. ^_^ Roslyakov I. O_o Usachev V. d-_-b</p>
        </footer>
      </div>
    );
  }
}

export default Main;
