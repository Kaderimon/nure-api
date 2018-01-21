import React, { Component } from 'react';
import './Item.css';

class Teacher extends Component {
  render () {
    const { data={}, empty=false} = this.props;

    return (
      <div className="item">
        {empty ? null : <i className="fa fa-graduation-cap"/>}
        {data.short_name || data.name || 'Ничего не найдено'}
      </div>
    );
  }
}

export default Teacher;