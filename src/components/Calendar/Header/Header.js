import React, { PureComponent } from 'react';
import { Col } from 'react-bootstrap';
import { daysOfWeek } from '../../../config/constants'
import './header.css';
class Header extends PureComponent {
    render () {
        return (
            <Col xs={11} xsOffset={1}>
                { daysOfWeek.map( item => 
                    <div className="col-xs-2">{item}</div>
                )}
            </Col>
        );
    }
}
  
export default Header;