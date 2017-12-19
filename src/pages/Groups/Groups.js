import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Item from '../../components/Item/Item';
import Transport from '../../core/Requester';
import PageHead from '../../components/PageHead/PageHead';
import _ from 'lodash';
import core from '../../core/core';

class Groups extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      search: [],
      facultet: _.get(props,'faculties[0].id', '')
    }
  }
  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'groups'}, true);
    this.fetchGroups();
  }
  async fetchGroups () {
    const response = await Transport.get("/api/groups");
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
    this.setState({facultet: Number(e.target.value)});
  }
  renderGroups () {
    return this.state.search.length > 0 ? 
      this.state.search.map(group => {
        return <NavLink onClick={e => {
          e.preventDefault();
          core.saveLocal('event', {id:group.id, name: group.name, type:'groups'}, true);
          this.props.history.push(`/groups/${group.id}`);
        }} to={`/groups/${group.id}`}>
          <Item data={group}/>
        </NavLink>
      })
      : 'No data';
  }
  render () {
    const facultet = _.find(this.props.faculties, {'id': this.state.facultet})
    console.log(facultet);
    return (
      <div className="groups">
        <PageHead title="Группы" onChange={this.search} />
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.onFacultetSelect}>
            {_.sortBy(this.props.faculties, ['short_name']).map((fac) => <option value={fac.id}>{fac.short_name}</option>)}
          </FormControl>
        </FormGroup>
        <div>{_.get(facultet, 'directions', []).map(dir => <div>{dir.short_name}</div>)}</div>
        <div className="items">
        </div>
      </div>
    );
  }
}

export default Groups;
//{this.renderGroups()}