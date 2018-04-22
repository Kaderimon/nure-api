import React, { Component } from 'react';
import './Home.css';
import core from '../../core/core';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import banner from '../../bann-rus.png';
import { NavLink } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'faculties'}, true);
  }

  render() {
    const history = core.getLocal('history') || [];
    return (
      <div className="App-intro">
          <div className="col-xs-offset-1 col-xs-10">
            <img src={banner} alt="Воруй смело, креативно" style={{width: '100%'}} />
          </div>
          <div className="col-xs-offset-1 col-xs-10 page-header flex links">
              <h1 className="App-title">Полезные ссылки</h1>
              <h1 className="App-title">История</h1>
            </div>
          <Col xs={10} xsOffset={1} className="flex links">
            <ul className="col-xs-4 information-block">
              <li><a href="http://nure.ua/stipendialnyj-rejting/" rel="noopener noreferrer" target="_blank">Стипендиальный рейтинг</a></li>
              <li><a href="http://nure.ua/all_news/" rel="noopener noreferrer" target="_blank">Новости университета</a></li>
            </ul>
            <div className="col-xs-4 information-block" style={{textAlign:'right'}}>
              {history.reverse().map((el,i)=>{
                const onNav = e => {
                  e.preventDefault();
                  core.saveLocal('event', {id:el.id, name: el.short_name || el.name, type: el.type}, true);
                  const history = core.getLocal('history') || [];
                  history.push({id:el.id, name: el.short_name || el.name, type: el.type});
                  core.saveLocal('history', history, true);
                  this.props.history.push(`/${el.type}/${el.id}`);
                };
                return <NavLink key={`item${i}`} onClick={onNav} to={`/${el.type}/${el.id}`} style={{display:'block'}}>
                    {el.name}
                  </NavLink>
              })}
            </div>
          </Col>       
      </div>
    );
  }
}

export default Home;
