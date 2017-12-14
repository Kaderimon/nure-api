import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Transport from '../../core/Requester';
import Item from '../../components/Item/Item';
import PageHead from '../../components/PageHead/PageHead';
import _ from 'lodash';

class Teachers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teachers: [],
      search: []
    }
  }
  componentDidMount() {
    this.fetchTeachers();
  }
  async fetchTeachers () {
    const { response } = await Transport.get("/api/teachers");
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

  render () {
    return (
      <div className="teachers">
        <PageHead title="Преподаватели" onChange={this.search} />
        <div className="items">
          {this.state.search.length > 0 ? this.state.search.map(teacher => <NavLink to={`/teachers/${teacher.id}`}>
              <Item data={teacher}/>
            </NavLink>) : 'No Data'}
        </div>
      </div>
    );
  }
}

export default Teachers;