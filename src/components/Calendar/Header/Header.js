import React, { PureComponent } from 'react';
import { Col } from 'react-bootstrap';
import { daysOfWeek } from '../../../config/constants'

class Header extends PureComponent {
    render () {
        return (
            <Col md={8} mdOffset={4}>
                { daysOfWeek.map( item => 
                    <span>{item}</span>
                )}
            </Col>
        );
    }
}
  
export default Header;