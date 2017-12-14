import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Item from '../../components/Item/Item';
import Transport from '../../core/Requester';

class Groups extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.fetchGroups();
  }
  async fetchGroups () {
    const { response } = await Transport.get("/api/groups");
    this.setState({data: response});
  }
  render () {
    return (
      <div className="groups">
        <h1 className="App-title">Расписание для групп</h1>
        <div className="items">
          {this.state.data.map(group => <NavLink to={`/groups/${group.id}`}>
              <Item data={group}/>
            </NavLink>)}
        </div>
      </div>
    );
  }
}

export default Groups;