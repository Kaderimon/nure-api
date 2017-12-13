import React, { Component } from 'react';
import Calendar from '../../components/Calendar/calendar';
import Transport from '../../core/Requester';

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
    const { response } = await Transport.get("/api/events/4801938");
    this.setState({data: response.events});
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