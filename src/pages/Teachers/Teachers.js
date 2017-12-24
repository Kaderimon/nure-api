import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Transport from '../../core/Requester';
import core from '../../core/core';
import Item from '../../components/Item/Item';
import PageHead from '../../components/PageHead/PageHead';
import { config } from '../../config/config.js';
import _ from 'lodash';

class Teachers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teachers: [],
      search: [],
      facultet: _.get(props,'faculties[0].id', ''),
      department: _.get(props,'faculties[0].departments[0].id', '')
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
      facultet: Number(e.target.value),
      department: _.get(fac,'departments[0].id', '')
    });
  }
  onDepSelect = (e) => {
    this.setState({department: Number(e.target.value)});
  }
  renderGroups () {
    const length = _.get(this.state, 'search.length', 0);
    if (length > 0) {
      return this.state.search.map(teacher => {
        const onNav = e => {
          e.preventDefault();
          core.saveLocal('event', {id:teacher.id, name: teacher.short_name, type:'teachers'}, true);
          this.props.history.push(`/teachers/${teacher.id}`);
        };
        return teacher.department_id === this.state.department ? 
          <NavLink onClick={onNav} to={`/teachers/${teacher.id}`}>
            <Item data={teacher}/>
          </NavLink>
          : null
      })
    }
    return 'No data';
  }
  render () {
    const facultet = _.find(this.props.faculties, {'id': this.state.facultet})

    return (
      <div className="teachers">
        <PageHead title="Преподаватели" onChange={this.search} />
        <FormGroup controlId="formControlsSelect" className="col-xs-6">
          <ControlLabel className="dropdown-label">Выберите факультет</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.onFacultetSelect}>
            {_.sortBy(this.props.faculties, ['short_name']).map((fac) => <option value={fac.id}>{fac.short_name}</option>)}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect" className="col-xs-6">
          <ControlLabel className="dropdown-label">Выберите кафедру</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.onDepSelect}>
            {_.get(facultet, 'departments', []).map((dep) => <option value={dep.id}>{dep.short_name}</option>)}
          </FormControl>
        </FormGroup>
        <div className="items col-xs-12">
          {this.renderGroups()}
        </div>
      </div>
    );
  }
}

export default Teachers;