import React, { PureComponent } from 'react';
import { Col } from 'react-bootstrap';
import { workHours } from '../../../config/constants';
import { daysOfWeek } from '../../../config/constants'
import './Schedule.css'

class Sidebar extends PureComponent {
    render () {
      const { data } = this.props
      return (
        <Col xs={12}>
          { workHours.map( lessons => 
            <Col xs={12} className="schedule">
              <Col xs={1}>
                {lessons.map(couple => <div>{couple}</div>)}
              </Col>
              {data.map(day => 
                <Col xs={1} style={{}}>
                  {day}
                </Col>
              )}
            </Col>
          )}
        </Col>
      );
    }
  }
  
  export default Sidebar;