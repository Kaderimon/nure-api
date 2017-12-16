import React, { Component } from 'react';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import moment from 'moment';
import Header from './Header/Header';
import Main from './Main/Main';
import './calendar.css';
import 'moment/locale/ru';

moment.locale('ru');
class Calendar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentWeek: moment().week(),
      weekRange: ""
    }
  }
  componentDidMount() {
    this.currentWeek();
  }
  nextWeek = (e) => {
    this.state.currentWeek++;
    this.state.weekRange = `${moment().week(this.state.currentWeek).day(1).format('D MMMM')} - ${moment().week(this.state.currentWeek).day(7).format('D MMMM')}`;
    this.setState(this.state);
  }
  previousWeek = (e) => {
    this.state.currentWeek--;
    this.state.weekRange = `${moment().week(this.state.currentWeek).day(1).format('D MMMM')} - ${moment().week(this.state.currentWeek).day(7).format('D MMMM')}`;
    this.setState(this.state);
  }
  currentWeek = (e) => {
    const currentWeek = moment().week();
    const weekRange = `${moment().week(currentWeek).day(1).format('D MMMM')}-${moment().week(currentWeek).day(7).format('D MMMM')}`;
    this.setState({
      currentWeek: currentWeek,
      weekRange: weekRange
    });
  }
  filterByDate = (events) => {
    return events.filter(event => {
      const time = moment(1970).seconds(event.start_time);
      const currentWeek = moment().week(this.state.currentWeek)
      return time.isSame(currentWeek, 'week') 
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
            {this.state.weekRange.toString()}
          </div>
        </div>
        <div className="c-table row">
          <div className="col-xs-12">        
            <Header week={moment().week(this.state.currentWeek)}/>
          </div>
          <Main data={this.filterByDate(this.props.data)}/>
        </div>
      </div>
    );
  }
}

export default Calendar;