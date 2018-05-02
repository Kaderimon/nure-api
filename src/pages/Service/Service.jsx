import React, { Component } from 'react';
import Transport from '../../core/Requester';
import PageHead from '../../components/PageHead/PageHead';
import { config } from '../../config/config.js';
import _ from 'lodash';
import core from '../../core/core';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Calendar from '../../components/Calendar/calendar';
import { Button, ButtonGroup } from "react-bootstrap";
import DatePicker from '../../components/DatePicker/DatePicker';
import moment from "moment";

class Service extends Component {
  constructor (props) {
    super(props);
    this.state = {
      groups: [],
      auditories: [],
      teachers: [],
      data: [],
      group: '',
      audit: '',
      teacher: '',
      time: moment().now,
      isDataRequested: false
    }
  }

  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'groups'}, true);
    this.fetchGroups();
    this.fetchAuditories();
    this.fetchTeachers();
  }

  async fetchGroups () {
    const response = await Transport.get(config.apis.groups);
    this.setState({groups: response});
  }

  async fetchAuditories () {
    const response = await Transport.get(config.apis.auditories);
    this.setState({auditories: response});
  }

  async fetchTeachers () {
    const response = await Transport.get(config.apis.teachers);
    this.setState({teachers: response});
  }

  onGroupSelect = (e) => {
    this.setState({group: e.target.value});
  }

  onAuditSelect = (e) => {
    this.setState({audit: e.target.value});
  }

  onTeacherSelect = (e) => {
    this.setState({teacher: e.target.value});
  }

  onSearch = () => {
    this.setState({ isDataRequested: true });
    this.findFreeTime();
  }

  findFreeTime = async () => {
    const { group, audit, teacher } = this.state;
    const response = await Transport.get(this.generateQueryString(group, audit, teacher));
    this.setState({ 
      data: _.get(response, 'events', []),
      isDataRequested: false
    });
  }

  generateQueryString (group, audit, teacher) {
    return `${config.apis.findFreeTime}auditorie=${audit}&group=${group}&teacher=${teacher}`
  }

  render () {
    const { groups, auditories, teachers, group, audit, teacher, isDataRequested, selectedWeek } = this.state;
    return (
      <div className="groups">
        <PageHead title="Свободные пары" onChange={this.search} />
        <div className="flex col-xs-12">
          <div className="information-block col-xs-offset-1 col-xs-3">
            <FormGroup controlId="formControlsSelect" className="col-xs-12">
              <ControlLabel className="dropdown-label">Выберите группу</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.onGroupSelect}>
                <option value={'none'}>Сделайте свой выбор</option>
                {groups.map((fac,i) => <option key={`fac${i}`} value={fac.id}>{fac.name}</option>)}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" className="col-xs-12">
              <ControlLabel className="dropdown-label">Выберите аудиторию</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.onAuditSelect}>
                <option value={'none'}>Сделайте свой выбор</option>
                {auditories.map((dep,i) => <option key={`dep${i}`} value={dep.id}>{dep.short_name}</option>)}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" className="col-xs-12">
              <ControlLabel className="dropdown-label">Выберите преподавателя</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.onTeacherSelect} >
                <option value={'none'}>Сделайте свой выбор</option>
                {teachers.map((dep,i) => <option key={`dep${i}`} value={dep.id}>{dep.short_name}</option>)}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" className="col-xs-12">
              <Button
                style={{margin: '5px'}}
                bsStyle="primary"
                onClick={this.onSearch}
                disabled={isDataRequested}
                 >Найти</Button>
            </FormGroup>
          </div>
          <Calendar data={this.state.data} customClass="col-xs-6" noInfo={true} />
        </div>
      </div>
    );
  }
}

export default Service;