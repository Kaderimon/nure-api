import React, { Component } from 'react';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import moment from 'moment';
import Header from './Header/Header';
import Main from './Main/Main';
import './calendar.css';
import 'moment/locale/ru';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import DatePicker from '../DatePicker/DatePicker';

moment.locale('ru');
class Calendar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentWeek: moment().week(),
      weekRange: "",
      showModal: false,
      modalData: {}
    }
  }
  componentDidMount() {
    this.currentWeek();
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = (data) => () => { this.setState({ showModal: true, modalData: data}) }
  nextWeek = (operator = true) => (e) => {
    const currentWeek = operator ? this.state.currentWeek + 1 : this.state.currentWeek - 1;
    this.setState({
      currentWeek: currentWeek,
      weekRange: this.calculateWeekRange(currentWeek)
    });
  }
  currentWeek = (e) => {
    const currentWeek = moment().week();
    this.setState({
      currentWeek: currentWeek,
      weekRange: this.calculateWeekRange(currentWeek)
    });
  }
  datePickerWeek = (date) => {
    const currentWeek = date.week();
    this.setState({
      currentWeek: currentWeek,
      weekRange: this.calculateWeekRange(currentWeek)
    });
  }
  calculateWeekRange = (currentWeek) => `${moment().week(currentWeek).day(1).format('D MMMM')}-${moment().week(currentWeek).day(7).format('D MMMM')}`;
  filterByDate = (events) => {
    return events.filter(event => {
      const time = moment(event.start_time);
      const currentWeek = moment().week(this.state.currentWeek)
      return time.isSame(currentWeek, 'week') 
    });
  }
  renderModal () {
    return <Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
        <Modal.Title>{_.get(this.state.modalData, 'subject.title', '???')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="c-modal-row">
          <Col xs={6}>
            <h3>Тип:</h3>
          </Col>
          <Col xs={6}>
            <div>{_.get(this.state.modalData, 'type.full_name', "")}</div>
          </Col>
        </Row>
        <Row className="c-modal-row">
          <Col xs={6}>
            <h3>Аудитория:</h3>
          </Col>
          <Col xs={6}>
            <div>{_.get(this.state.modalData, 'auditory', "")}</div>
          </Col>
        </Row>
        <Row className="c-modal-row">
          <Col xs={6}>
            <h3>Преподаватели:</h3>
          </Col>
          <Col xs={6}>
            {_.get(this.state.modalData, 'teachers', []).map(teacher => {
                return <div>{teacher.full_name}</div>
            })}
          </Col>
        </Row>
        <Row className="c-modal-row">
          <Col xs={6}>
            <h3>Группы:</h3>
          </Col>
          <Col xs={6}>
            {_.get(this.state.modalData, 'groups', []).map(group => {
              return <div>{group.name}</div>
            })}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  }
  render () {
    return (
      <div className="col-xs-offset-1 col-xs-10 calendar information-block">
        {this.renderModal()}
        <div className="c-control">
          <ButtonGroup>
            <Button onClick={this.nextWeek(false)}><i className="fa fa-arrow-left fa-fw"></i></Button> 
            <Button onClick={this.currentWeek}><i className="fa fa-dot-circle-o fa-fw"></i></Button>
            <Button onClick={this.nextWeek(true)}><i className="fa fa-arrow-right fa-fw"></i></Button>
          </ButtonGroup>
          <DatePicker change={this.datePickerWeek} conf={{icon: true}}/>
          <div className="c-control__info">
            {this.state.weekRange.toString()}
          </div>
        </div>
        <div className="c-table row">
          <div className="col-xs-12">        
            <Header week={moment().week(this.state.currentWeek)}/>
          </div>
          <Main data={this.filterByDate(this.props.data)} showModal={this.open}/>
        </div>
      </div>
    );
  }
}

export default Calendar;