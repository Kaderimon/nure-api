import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import { workHours } from '../../../config/constants';
import { daysOfWeek } from '../../../config/constants'
import './Main.css'

class Main extends Component {
  renderLessons(data, i) {
    return daysOfWeek.map( (day,dayNumber) => 
      <Col xs={1} style={{}}>
        {data.map(lesson => {
          const lessonDay = moment(1970).seconds(lesson.start_time).day();
          if(lessonDay === dayNumber && lesson.number_pair === i+1){
            return _.get(lesson, 'auditory', '???');            
          }
        })}
      </Col>
    )
  }
  render () {
    const { data } = this.props
    return (
      <Col xs={12}>
        { workHours.map( (time, i) => 
          <Col xs={12} className="schedule">
            <Col xs={1}>
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