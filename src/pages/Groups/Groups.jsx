import React, { Component } from 'react';
import Transport from '../../core/Requester';
import PageHead from '../../components/PageHead/PageHead';
import Filter from '../../components/Filter/Filter';
import FEtable from '../../components/FEtable/FEtable';
import { config } from '../../config/config.js';
import _ from 'lodash';
import core from '../../core/core';

class Groups extends Component {
  constructor (props) {
    super(props);
    this.state = {
      groups: [],
      search: [],
      facultet: 'all',
      department: 'all',
    }
  }

  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'groups'}, true);
    this.fetchGroups();
  }

  async fetchGroups () {
    const response = await Transport.get(config.apis.groups);
    this.setState({groups: response, search: response});
  }

  search = (val) => {
    if (val !== '') {
        this.setState({
            search: _.filter(this.state.groups, data => {
                return this.found(data, 'name', val) || this.found(data, 'id', val);
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
      direction: _.get(fac,'directions[0].id', 'all')
    }, ()=>this.filter());
  }

  onDirectionSelect = (e) => {
    this.setState({direction: e.target.value}, ()=>this.filter());
  }

  filter() {
    const { direction, facultet } = this.state;
    if(facultet === 'all'){
      this.setState({ search: this.state.groups });
      return;
    }
    const search = direction === 'all' ? 
      [] : this.state.groups.filter( item => item.direction_id === Number(direction) );
    this.setState({ search });
  }

  render () {
    return (
      <div className="groups">
        <PageHead title="Группы" onChange={this.search} />
        <div className="flex col-xs-12">
          <Filter 
            faculties={this.props.faculties}
            facultet={this.state.facultet}
            onFacultetSelect={this.onFacultetSelect}
            onDepSelect={this.onDirectionSelect}
            selector={'directions'}
            />
          <FEtable
            data={this.state.search}
            root={'group'}
            history={this.props.history}/>
        </div>
      </div>
    );
  }
}

export default Groups;