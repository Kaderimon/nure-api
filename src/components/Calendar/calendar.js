import React, { PureComponent } from 'react';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import "./calendar.css"

class Calendar extends PureComponent {
  render () {
    return (
      <div className="calendar">
        <div className="c-control">
          <ButtonGroup>
            <Button><i className="fa fa-arrow-left fa-fw"></i></Button> 
            <Button><i className="fa fa-dot-circle-o fa-fw"></i></Button>
            <Button><i className="fa fa-arrow-right fa-fw"></i></Button>
          </ButtonGroup>
          <div className="c-control__info">
            1 сентября - 10 сентября
          </div>
        </div>
        <div className="c-table row">
          <Header />
          <div className="col-xs-12">
            <Sidebar />
            <Main />
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;