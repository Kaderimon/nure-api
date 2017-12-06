import React, { PureComponent } from 'react';
import { Col } from 'react-bootstrap';
import { daysOfWeek } from '../../../config/constants'
import './header.css';
class Header extends PureComponent {
    render () {
        return (
            <Col xs={12} className="c-header">
                <Col xs={1}></Col>
                { daysOfWeek.map( item => 
                    <Col xs={1}>{item}</Col>
                )}
            </Col>
        );
    }
}
  
export default Header;