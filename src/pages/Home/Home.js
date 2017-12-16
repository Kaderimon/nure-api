import React, { Component } from 'react';
import './Home.css';
import _ from 'lodash'
import Transport from '../../core/Requester';
import core from '../../core/core';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'faculties'}, true);
    this.fetchFaculties();
  }
  async fetchFaculties () {
    const { response } = await Transport.get("/api/faculties");
    this.setState({data: response, search: response});
  }
  render() {
    return (
      <div className="App-intro">

      </div>
    );
  }
}

export default Home;
