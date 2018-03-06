import React, { Component } from 'react';
import DateTime from 'react-datetime';
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { Button } from "react-bootstrap";

class DatePicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      configuration: {
        onChange: this.props.change,
        icon: false,
        timeConstraints: { hours: { min: 7, max: 18} },
        defaultValue: moment().hours(7).minutes(45)
      }
    }
  }
  renderInput( props, openCalendar, closeCalendar ){
    return <Button onClick={openCalendar}>
      <i className="fa fa-calendar"></i>
    </Button>
  }

  render () {
    const icon = this.props.conf ? this.props.conf.icon : this.state.icon;
    return <DateTime renderInput={ icon ? this.renderInput : null} {...this.state.configuration} {...this.props.conf}/>
  }
}

export default DatePicker;