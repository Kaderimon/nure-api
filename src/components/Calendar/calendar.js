import React, { PureComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';

class Calendar extends PureComponent {
  render () {
    return (
      <div className="calendar">
        <Row>
          <Header />
        </Row>
        <Row>
          <Sidebar />
          <Main />
        </Row>
      </div>
    );
  }
}

export default Calendar;