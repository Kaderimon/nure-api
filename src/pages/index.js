import React, { Component } from 'react';
import './App.css';
import _ from 'lodash'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fetched: {}
    }
  }

  fetchDevices () {
    fetch('https://cors-anywhere.herokuapp.com/cist.nure.ua/ias/app/tt/get_faculties', {
      method: 'get',
      mode: 'cors'
    }).then( response => (response.json()))
    .then(data => {
      this.setState({
        fetched: data
      });
      console.log('done',this);
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
        {_.get(this.state.fetched, 'university.short_name', 'Kek')}
      </div>
    );
  }
}

export default App;
