import React, { Component } from 'react';
import Transport from '../../core/Requester';
import TeachersList from '../../components/TeachersList/TeachersList';

class Teachers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teachers: []
    }
  }
  componentDidMount() {
    this.fetchTeachers();
  }
  async fetchTeachers () {
    const { response } = await Transport.get("/api/teachers");
    this.setState({teachers: response});
  }
  render () {
    return (
      <div className="teachers">
        <h1 className="App-title">Расписание преподователей</h1>
        <TeachersList teachers={this.state.teachers} />
      </div>
    );
  }
}

export default Teachers;