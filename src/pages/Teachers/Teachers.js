import React, { Component } from 'react';
import Transport from '../../core/Requester';
import core from '../../core/core';
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
      this.filter()
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
    }, ()=> this.filter());
  }

  onDepSelect = (e) => {
    this.setState({department: e.target.value}, ()=> this.filter());
  }

  filter() {
    const { department, facultet } = this.state;
    if(facultet === 'all'){
      this.setState({ search: this.state.teachers });
      return;
    }
    const search = department === 'all' ? 
      [] : this.state.teachers.filter( item => item.department_id === Number(department) );
    this.setState({ search });
  }

  render () {
    return (
      <div className="teachers">
        <PageHead title="Преподаватели" onChange={this.search} />
        <div className="flex">
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
      </div>
    );
  }
}

export default Teachers;