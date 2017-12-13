import React, { Component } from 'react';
import Transport from '../../core/Requester';

class Teacher extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    const { teacher } = this.props;
    return (
      <div className="teacher">
        {teacher.short_name}
      </div>
    );
  }
}

export default Teacher;