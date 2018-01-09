import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Item from '../../components/Item/Item';
import Transport from '../../core/Requester';
import PageHead from '../../components/PageHead/PageHead';
import Filter from '../../components/Filter/Filter';
import { config } from '../../config/config.js';
import _ from 'lodash';
import core from '../../core/core';

class Groups extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      search: [],
      facultet: 'All',
      direction: _.get(props,'faculties[0].directions[0].id', '')
    }
  }
  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'groups'}, true);
    this.fetchGroups();
  }
  async fetchGroups () {
    const response = await Transport.get(config.apis.groups);
    this.setState({data: response, search: response});
  }
  search = (val) => {
    if (val !== '') {
        this.setState({
            search: _.filter(this.state.data, data => {
                return this.found(data, 'name', val) || this.found(data, 'id', val);
            })
        });
    } else {
      this.setState({search: this.state.data});
    }
  }
  found = (data, field, compareVal) => {
      return _.includes(_.toLower(data[field]), _.toLower(compareVal));
  }
  onFacultetSelect = (e) => {
    const fac = _.find(this.props.faculties, {'id': Number(e.target.value)})
    this.setState({
      facultet: Number(e.target.value),
      direction: _.get(fac,'directions[0].id', '')
    });
  }
  onDirectionSelect = (e) => {
    this.setState({direction: Number(e.target.value)});
  }
  renderGroups () {
    const length = _.get(this.state, 'search.length', 0);
    if (length > 0) {
      return this.state.search.map(group => {
        const navigate = e => {
          e.preventDefault();
          core.saveLocal('event', {id:group.id, name: group.name, type:'groups'}, true);
          this.props.history.push(`/groups/${group.id}`);
        };
        return group.direction_id === this.state.direction ? 
          <NavLink onClick={navigate} to={`/groups/${group.id}`}>
            <Item data={group}/>
          </NavLink>
          : null
      })
    }
    return 'No data';
  }
  render () {
    return (
      <div className="groups">
        <PageHead title="Группы" onChange={this.search} />
        <Filter 
          faculties={this.props.faculties}
          facultet={this.state.facultet}
          onFacultetSelect={this.onFacultetSelect}
          onDepSelect={this.onDirectionSelect}
          selector={'directions'}
          />
        <div className="items col-xs-12">
          {this.renderGroups()}
        </div>
      </div>
    );
  }
}

export default Groups;