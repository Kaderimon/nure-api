import React, { Component } from 'react';
import Calendar from '../../components/Calendar/calendar'

class Groups extends Component {
  render () {
    return (
      <div className="App-main">
        <h1 className="App-title">Расписание для групп</h1>
        <Calendar />
      </div>
    );
  }
}

export default Groups;