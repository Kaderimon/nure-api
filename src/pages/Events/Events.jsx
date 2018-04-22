import React, { Component } from 'react';
import Calendar from '../../components/Calendar/calendar';
import Transport from '../../core/Requester';
import core from '../../core/core';
import { config } from '../../config/config.js';
import _ from 'lodash';

class Events extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      name: '',
      sync: ''
    }
  }
  componentDidMount() {
    const name = _.get(core.getLocal('event'),'name','') || 'Неизвестно';
    this.setState({name});
    const [uri, target] = this.props.location.pathname.split('/');
    this.fetchInfo(target);
    this.fetchEvents(target);
  }
  async fetchEvents (target) {
    const response = await Transport.get(`${config.apis.events}${target}/${this.props.match.params.id}`);
    const sync = _.get(response, 'sync', 'Неизвестно')
    this.setState({
      data: _.get(response, 'events', []),
      sync
    });
  }
  async fetchInfo (target) {
    const id = this.props.match.params.id;
    core.saveLocal('event', { id: id, type:target }, true);
    try {
      const response = await Transport.get(`/api/${target}/${this.props.match.params.id}`);
      this.setState({name: response.short_name || response.name});
    } catch (e) {
      this.props.history.push('/404');
    }
  }
  render () {
    return (
      <div className="events">
        <div className="col-xs-offset-1 col-xs-10 page-header">
            <h1 className="App-title">{this.state.name}</h1>
            <p style={{color: '#fff'}}>Последнее обновление: {this.state.sync}</p>
        </div>
        <Calendar data={this.state.data}/>
      </div>
    );
  }
}

export default Events;