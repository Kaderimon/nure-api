import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Transport from '../../core/Requester';
import core from '../../core/core';
import Item from '../../components/Item/Item';
import PageHead from '../../components/PageHead/PageHead';
import Filter from '../../components/Filter/Filter';
import FEtable from '../../components/FEtable/FEtable';
import { config } from '../../config/config.js';
import _ from 'lodash';

class Teachers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teachers: [],
      search: [],
      facultet: 'all',
      department: 'all'
    }
  }

  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'teachers'}, true);
    this.fetchTeachers();
  }

  async fetchTeachers () {
    const response = await Transport.get(config.apis.teachers);
    this.setState({teachers: response, search: response});
  }

  search = (val) => {
    if (val !== '') {
        this.setState({
            search: _.filter(this.state.teachers, data => {
                return this.found(data, 'full_name', val) || this.found(data, 'short_name', val) || this.found(data, 'id', val);
            })
        });
    } else {
      this.setState({search: this.state.teachers});
    }
  }

  found = (data, field, compareVal) => {
      return _.includes(_.toLower(data[field]), _.toLower(compareVal));
  }

  onFacultetSelect = (e) => {
    const fac = _.find(this.props.faculties, {'id': Number(e.target.value)})
    this.setState({
      facultet: e.target.value,
      department: _.get(fac,'departments[0].id', 'all')
    });
  }

  onDepSelect = (e) => {
    this.setState({department: e.target.value});
  }

  render () {
    const facultet = _.find(this.props.faculties, {'id': this.state.facultet})

    return (
      <div className="teachers">
        <PageHead title="Преподаватели" onChange={this.search} />
        <Filter 
          faculties={this.props.faculties}
          facultet={this.state.facultet}
          onFacultetSelect={this.onFacultetSelect}
          onDepSelect={this.onDepSelect}
          selector={'departments'}
          />
        <FEtable
          data={this.state.search}
          root={'teachers'}
          history={this.props.history}/>
      </div>
    );
  }
}

export default Teachers;