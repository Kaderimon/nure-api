import React, { Component } from 'react';
import Calendar from '../../components/Calendar/calendar'

class Groups extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.fetchEvents();
  }
  async fetchEvents () {
    const data = await Transport.get("/api/events/4801938");
    this.setState({data: data.events});
  }
  render () {
    return (
      <div className="groups">
        <h1 className="App-title">Расписание для групп</h1>
        <Calendar data={this.state.data}/>
      </div>
    );
  }
}

export default Groups;