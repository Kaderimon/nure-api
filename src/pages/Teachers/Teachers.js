import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Transport from '../../core/Requester';
import Item from '../../components/Item/Item';

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
        <div className="items">
          {this.state.teachers.map(teacher => <NavLink to={`/teachers/${teacher.id}`}>
              <Item onClick={()=>console.log('11')}data={teacher}/>
            </NavLink>)}
        </div>
      </div>
    );
  }
}

export default Teachers;