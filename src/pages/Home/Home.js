import React, { Component } from 'react';
import './Home.css';
import _ from 'lodash'
import Transport from '../../core/Requester';
import core from '../../core/core';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'faculties'}, true);
    this.fetchFaculties();
  }
  async fetchFaculties () {
    const { response } = await Transport.get("/api/faculties");
    this.setState({data: response, search: response});
  }
  render() {
    return (
      <div className="App-intro">
        <h1 className="App-title" style={{textAlign:'center', marginBottom:'50px'}}>Добро пожаловать!</h1>
        <p style={{fontSize: 'larger',width: '50%', margin: '0 auto', color: 'white'}}>Задача “Расписание” предназначена для предоставления актуальной и своевременной информации о расписании учебного процесса университета. При использовании данного сервиса все пользователи могут получать расписание для академических групп, для потоков академических групп, а также расписание преподавателей (как выборочно так и по кафедрам в целом).</p>
      </div>
    );
  }
}

export default Home;
