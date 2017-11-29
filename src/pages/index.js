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

  componentDidMount () {
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
