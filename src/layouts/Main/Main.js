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
        <Grid fluid={true}>
            {this.props.children}
        </Grid>
        <footer className="App-footer">
          <p className="App-copy">Hey yooo</p>
        </footer>
      </div>
    );
  }
}

export default Main;
