import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
      search: []
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
  render () {
    return (
      <div className="groups">
        <PageHead title="Группы" onChange={this.search} />
        <div className="items">
          {this.state.search.length > 0 ? this.state.search.map(group => <NavLink onClick={e => {
            e.preventDefault();
            core.saveLocal('event', {id:group.id, name: group.name, type:'groups'}, true);
            this.props.history.push(`/groups/${group.id}`);
          }} to={`/groups/${group.id}`}>
              <Item data={group}/>
            </NavLink>) : 'No data'}
        </div>
      </div>
    );
  }
}

export default Groups;