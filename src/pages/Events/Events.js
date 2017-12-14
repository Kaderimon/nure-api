import React, { Component } from 'react';
import Calendar from '../../components/Calendar/calendar';
import Transport from '../../core/Requester';

class Events extends Component {
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
    const { response } = await Transport.get(`/api/events/${this.props.match.params.id}`);
    this.setState({data: response.events});
  }
  render () {
    return (
      <div className="groups">
        <h1 className="App-title">Расписание для {this.props.match.params.id}</h1>
        <Calendar data={this.state.data}/>
      </div>
    );
  }
}

export default Events;