import React, { Component } from 'react';
import './App.css';
import _ from 'lodash'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fetched: []
    }
  }
 //https://cors-anywhere.herokuapp.com/cist.nure.ua/ias/app/tt/get_faculties
  fetchDevices () {
    fetch('/api/groups', {
      method: 'get'
    })
    .then(response => (response.json()))
    .then(data => {
      this.setState({
        fetched: data
      });
      console.log('done', data);
    });
  }

  componentDidMount () {
    this.fetchDevices();
  }

  render() {
    return (
      <div>
        <p className="App-intro">
          Thuck.
        </p>
        <ul>
        {this.state.fetched.map(item => <li>{item.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
