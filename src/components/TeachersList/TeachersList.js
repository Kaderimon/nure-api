import React, { Component } from 'react';
import Transport from '../../core/Requester';
import Teacher from '../Teacher/Teacher';

class TeachersList extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
  }
  
  render () {
    return (
      <div className="list">
        {this.props.teachers.map((teacher) => <Teacher teacher={teacher}/>)}
      </div>
    );
  }
}

export default TeachersList;