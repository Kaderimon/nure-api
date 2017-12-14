import React, { Component } from 'react';
import Transport from '../../core/Requester';
import './Item.css';

class Teacher extends Component {
  render () {
    const { data } = this.props;
    return (
      <div className="item">
        {data.short_name || data.name}
      </div>
    );
  }
}

export default Teacher;