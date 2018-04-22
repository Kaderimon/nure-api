import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import core from '../../core/core';
import Item from '../../components/Item/Item';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import './FEtable.css'
import PerPagePicker from "./perPagePicker/perPagePicker";

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

  handlePerPageChange = (perPage) => {
    const { data } = this.state;
    this.setState({ perPage, pageCount: Math.ceil(data.length/perPage) });
  }

  renderGroups () {
    const length = _.get(this.state, 'data.length', 0);
    const { currentPage, perPage, root } = this.state;
    const quickMath = currentPage*perPage;
    if (length > 0) {
      return this.state.data.slice(quickMath, quickMath+perPage).map( (val, i) => {
        const onNav = e => {
          e.preventDefault();
          core.saveLocal('event', {id:val.id, name: val.short_name || val.name, type: root}, true);
          const history = core.getLocal('history');
          history.push({id:val.id, name: val.short_name || val.name, type: root});
          const uniqueHistory = _.uniqWith(history, _.isEqual);
          core.saveLocal('history', uniqueHistory.length > 10 ? uniqueHistory.splice(-10,10) : uniqueHistory, true);
          this.props.history.push(`/${root}/${val.id}`);
        };
        return <NavLink key={`item${i}`} onClick={onNav} to={`/${root}/${val.id}`}>
            <Item data={val}/>
          </NavLink>
      })
    }
    return <Item empty={true} />;
  }

  renderSpinner () {
    return <i className="fa fa-spinner fa-spin"></i>;
  }
  render () {
    return (
        <div className="information-block col-xs-offset-1 col-xs-6 FEtable">
          <div className="items">
            {this.props.isDataRequested ? this.renderSpinner() : this.renderGroups()}
          </div>
          <div className="pagination-container">
            <ReactPaginate 
              previousLabel={<i className="fa fa-arrow-left pointer"></i>}
              nextLabel={<i className="fa fa-arrow-right pointer"></i>}
              breakLabel={<a href=""><i className="fa fa-ellipsis-h" aria-hidden="true"></i></a>}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
            <PerPagePicker onPerPageChange={this.handlePerPageChange}/>
          </div>
        </div>
    );
  }
}

export default FEtable;