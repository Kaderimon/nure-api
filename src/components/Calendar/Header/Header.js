import React, { PureComponent } from 'react';
import { Col } from 'react-bootstrap';
import { daysOfWeek } from '../../../config/constants'

class Header extends PureComponent {
    render () {
        return (
            <Col md={11} mdOffset={1} style={{display: 'flex'}}>
                { daysOfWeek.map( item => 
                    <div className="col-md-2">{item}</div>
                )}
            </Col>
        );
    }
}
  
export default Header;