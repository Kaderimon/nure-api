import React, { Component } from 'react';
import './Home.css';
import core from '../../core/core';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import banner from '../../bann-rus.png';

class Home extends Component {
  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'faculties'}, true);
  }

  render() {
    return (
      <div className="App-intro">
          <div className="col-xs-offset-1 col-xs-10">
            <img src={banner} alt="Воруй смело, креативно" style={{width: '100%'}} />
          </div>
          <div className="col-xs-offset-1 col-xs-10 page-header">
            <h1 className="App-title">Полезные ссылки</h1>
          </div>
          <Col xs={10} xsOffset={1}>
            <ul className="flex links information-block">
              <li><a href="http://nure.ua/stipendialnyj-rejting/" target="_blank">Стипендиальный рейтинг</a></li>
              <li><a href="http://nure.ua/all_news/" target="_blank">Новости университета</a></li>
            </ul>
          </Col>       
      </div>
    );
  }
}

export default Home;
