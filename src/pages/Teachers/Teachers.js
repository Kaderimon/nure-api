import React, { Component } from 'react';
import Transport from '../../core/Requester';

class Teachers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teachers: []
    }
  }
  componentDidMount() {
    this.fetchEvents();
  }
  async fetchEvents () {
    const data = await Transport.get("/api/teachers");
    this.setState({teachers: data});
  }
  render () {
    return (
      <div className="groups">
        <h1 className="App-title">Расписание преподователей</h1>
      </div>
    );
  }
}

export default Teachers;