import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Nav from '../../components/Navigation/Navigation'
import Header from '../../components/Header/Header'
import './Main.css'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      updateDB: false
    }
  }

  componentDidMount() {
    
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
        <div className="App-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Main;
        //<footer className="App-footer">
        //  <p className="App-copy">Shupyliuk M. && Roslyakov I. && Usachev V.</p>
        //</footer>