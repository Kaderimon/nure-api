import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import { workHours, daysOfWeek, lessonColor } from '../../../config/constants';
import './Main.css';

class Main extends Component {
  renderLessons(data, pair) {
    return daysOfWeek.map((day,dayNumber) => {
      let lessonColorToSet = "";
      let modalData = null;
      const lessons = data.map(lesson => {
        const lessonDay = moment(lesson.start_time).day();
        if ( lessonDay === dayNumber+1 && lesson.number_pair === pair+1 ) {
          lessonColorToSet = lessonColor[_.get(lesson, "type.id_base", "default")];
          modalData = { ...lesson }
          return <div>
            {_.get(lesson, "subject.brief", "???")}
            <div style={{fontSize: "smaller", marginTop:"5px"}}>
              <span>{_.get(lesson, "type.short_name", "???")} </span>
              <span>{_.get(lesson, "auditory", "???")}</span>
            </div>
          </div>
        }
      })
      const showModal = modalData ? this.props.showModal(modalData) : ()=>{};
      return <Col xs={1} className="lesson" style={{backgroundColor: lessonColorToSet}} onClick={showModal}>
        {lessons}
      </Col>
    })
  }
  render () {
    const { data } = this.props
    return (
      <Col xs={12}>
        { workHours.map( (time, i) => 
          <Col xs={12} className="schedule">
            <Col xs={1} className="timeRange lesson">
              {time.map(range => <div>{range}</div>)}
            </Col>
            {this.renderLessons(data, i)}
          </Col>
        )}
      </Col>
    );
  }
}
  
  export default Main;