import React, { Component } from 'react';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import moment from 'moment';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import './calendar.css';

class Calendar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      currentWeek: moment()
    }
  }
  componentDidMount() {
    this.setState({
      currentWeek: moment()
    })
  }
  nextWeek = (e) => {
    const week = this.state.currentWeek.add(1,"weeks");
    this.setState(this.state);
  }
  previousWeek = (e) => {
    this.state.currentWeek.subtract(1,"weeks");
    this.setState(this.state);
  }
  currentWeek = (e) => {
    const currentWeek = moment();
    this.setState({
      currentWeek: currentWeek
    });
  }

  render () {
    return (
      <div className="calendar">
        <div className="c-control">
          <ButtonGroup>
            <Button onClick={this.previousWeek}><i className="fa fa-arrow-left fa-fw"></i></Button> 
            <Button onClick={this.currentWeek}><i className="fa fa-dot-circle-o fa-fw"></i></Button>
            <Button onClick={this.nextWeek}><i className="fa fa-arrow-right fa-fw"></i></Button>
          </ButtonGroup>
          <div className="c-control__info">
            {this.state.currentWeek.format("D, MMMM")}
          </div>
        </div>
        <div className="c-table row">
          <div className="col-xs-12">        
            <Header />
          </div>
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default Calendar;