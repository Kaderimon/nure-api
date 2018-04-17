import React, { Component } from 'react';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import moment from 'moment';
import Header from './Header/Header';
import Main from './Main/Main';
import List from './List/List';
import './calendar.css';
import 'moment/locale/ru';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import DatePicker from '../DatePicker/DatePicker';
import FilterButton from './Filter/Filter';
import { CSVLink } from 'react-csv';

moment.locale('ru');

const DISPLAY_TYPES = {
  list: 'fa-th',
  gallery: 'fa-list'
}

class Calendar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedWeek: moment().week(),
      weekRange: '',
      showModal: false,
      modalData: {},
      data: props.data || [],
      displayType: 'list',
      events: [],
      listData: []
    }
  }
  componentDidMount() {
    this.currentWeek();
  }
  componentWillReceiveProps(props) {
    this.onInitialSelect(props);
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = (data) => () => { this.setState({ showModal: true, modalData: data}) }
  nextWeek = (operator = true) => (e) => {
    const nextWeek = operator ? this.state.selectedWeek + 1 : this.state.selectedWeek - 1;
    this.setState({
      selectedWeek: nextWeek,
      weekRange: this.calculateWeekRange(nextWeek),
      data: this.filterByDate(this.props.data, nextWeek)
    });
  }
  currentWeek = (e) => {
    const currentWeek = moment().week();
    this.setState({
      selectedWeek: currentWeek,
      weekRange: this.calculateWeekRange(currentWeek),
      data: this.filterByDate(this.props.data, currentWeek)
    });
  }
  datePickerWeek = (date) => {
    const pickedWeek = date.week();
    this.setState({
      selectedWeek: pickedWeek,
      weekRange: this.calculateWeekRange(pickedWeek),
      data: this.filterByDate(this.props.data, pickedWeek)
    });
  }
  calculateWeekRange = (currentWeek) => `[${moment().week(currentWeek).day(1).format('D MMMM')} ... ${moment().week(currentWeek).day(7).format('D MMMM')}]`;
  filterByDate = (events, currentWeek) => {
    return events.filter(event => {
      const time = moment(event.start_time);
      const selectedWeek = moment().week(currentWeek)
      return time.isSame(selectedWeek, 'week') 
    });
  }
  filterList = (events, {subjectId, typeId, groupId}) => {
    return events.filter(event => {
      const isGroupHere = _.isUndefined(_.find(event.groups, { 'id': Number(groupId) }))
      return event.subject.id === Number(subjectId) && event.type.id === Number(typeId) && !isGroupHere
    });
  }
  convertData = (events) => {
    return events.map(event => {
      const { end_time, start_time, groups = [], auditory, type, subject, teachers } = event;

      const time = `${moment(end_time).format("DD.MM.YYYY")} ${moment(start_time).format("HH:mm")}-${moment(end_time).format("HH:mm")}`;

      return {
        time,
        subject:subject.brief,
        type:type.short_name,
        auditory,
        teachers: teachers.map(teacher => teacher.short_name).join(" & "),
        groups: groups.map(group => group.name).join(" & ")
      } 
    });
  }
  changeDisplayType = () => {
    const displayType = this.state.displayType === 'list' ? 'gallery' : 'list';
    this.setState({ displayType });
  }
  onListFilterApply = (obj) => {
    this.setState({
      listData: this.filterList(this.state.data, obj)
    });
  }
  onInitialSelect = (props) => {
    const propsForSure = props ? props : this.props;
    this.setState({
      data: this.filterByDate(propsForSure.data, this.state.selectedWeek),
      listData: this.filterByDate(propsForSure.data, this.state.selectedWeek),
      events: this.convertData(propsForSure.data)
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
        <Row className="c-modal-row">
          <Col xs={6}>
            <h3>Номер пары:</h3>
          </Col>
          <Col xs={6}>
            <div>{_.get(this.state.modalData, 'lesson_number', "")}</div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  }

  renderBody = () => {
    return this.state.displayType === 'gallery' ?
    <div className="c-table row">
      <div className="col-xs-12">
        <Header week={moment().week(this.state.selectedWeek)}/>
      </div>
      <Main data={this.state.data} showModal={this.open}/>
    </div>
    : <div className="c-table list row">
        <List data={this.state.listData}/>
      </div>
  }

  render () {
    const {selectedWeek, displayType, weekRange, data} = this.state;
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
          <CSVLink
            filename={"schedule.csv"}
            data={this.state.events}
            className="btn btn-default">
              <i className="fa fa-download fa-fw"></i>
          </CSVLink>
          <ButtonGroup>
            <FilterButton displayType={displayType} data={this.state.data} onApply={this.onListFilterApply} onClear={this.onInitialSelect}/>
            <Button onClick={this.changeDisplayType}><i className={`fa ${DISPLAY_TYPES[displayType]} fa-fw`}></i></Button>
          </ButtonGroup>
        </div>
        {this.renderBody()}
        <div className="c-control__info">
          {weekRange.toString()}
        </div>
      </div>
    );
  }
}

export default Calendar;