import React, { PureComponent } from 'react';
import { Col } from 'react-bootstrap';
import { workHours } from '../../../config/constants';

class Sidebar extends PureComponent {
    render () {
      return (
        <Col xs={1}>
          { workHours.map( lessons => 
              <div>
                {lessons.map(couple => <div>{couple}</div>)}
              </div>
          )}
        </Col>
      );
    }
  }
  
  export default Sidebar;