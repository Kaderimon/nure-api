import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Transport from '../../core/Requester';
import core from '../../core/core';
import Item from '../../components/Item/Item';
import PageHead from '../../components/PageHead/PageHead';
import Filter from '../../components/Filter/Filter';
import { config } from '../../config/config.js';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';

class Teachers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teachers: [],
      search: [],
      facultet: 'all',
      department: 'all',
      pageCount: 12
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
  renderGroups () {
    const length = _.get(this.state, 'search.length', 0);
    if (length > 0) {
      return this.state.search.map(teacher => {
        const onNav = e => {
          e.preventDefault();
          core.saveLocal('event', {id:teacher.id, name: teacher.short_name, type:'teachers'}, true);
          this.props.history.push(`/teachers/${teacher.id}`);
        };
        return <NavLink onClick={onNav} to={`/teachers/${teacher.id}`}>
            <Item data={teacher}/>
          </NavLink>
      })
    }
    return 'No data';
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
        <div className="col-xs-8">
          <div className="items">
            {this.renderGroups()}
          </div>
          <ReactPaginate previousLabel={<i className="fa fa-arrow-left pointer"></i>}
                        nextLabel={<i className="fa fa-arrow-right pointer"></i>}
                        breakLabel={<a href=""><i className="fa fa-ellipsis-h" aria-hidden="true"></i></a>}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
        </div>
      </div>
    );
  }
}

export default Teachers;