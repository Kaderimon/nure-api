import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Transport from '../../core/Requester';
import core from '../../core/core';
import Item from '../../components/Item/Item';
import { config } from '../../config/config.js';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import './FEtable.css'

class FEtable extends Component {
  constructor (props) {
    super(props);
    const { data=[], perPage=10, root='' } = props;
    this.state = {
      data,
      perPage,
      root,
      currentPage: 0,
      pageCount: Math.ceil(data.length/perPage)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { data=[], perPage=10, root='' } = nextProps;
    this.setState({
      data,
      perPage,
      root,
      currentPage: 0,
      pageCount: Math.ceil(data.length/perPage)
    });
  }

  handlePageChange = (e) => {
    this.setState({
        currentPage: e.selected
    });
  }

  renderGroups () {
    const length = _.get(this.state, 'data.length', 0);
    const { currentPage, perPage } = this.state;
    const quickMath = currentPage*perPage;
    if (length > 0) {
      return this.state.data.slice(quickMath, quickMath+perPage).map( val => {
        const onNav = e => {
          e.preventDefault();
          core.saveLocal('event', {id:val.id, name: val.short_name, type: this.state.root}, true);
          this.props.history.push(`/${this.state.root}/${val.id}`);
        };
        return <NavLink onClick={onNav} to={`/${this.state.root}/${val.id}`}>
            <Item data={val}/>
          </NavLink>
      })
    }
    return 'No data';
  }

  render () {
    return (
        <div className="col-xs-8 FEtable" style={{border:"1px solid #ccc"}}>
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
                        onPageChange={this.handlePageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
        </div>
    );
  }
}

export default FEtable;