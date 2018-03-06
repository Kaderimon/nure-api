import React, { Component } from 'react';
import DateTime from 'react-datetime';
import moment from "moment";
import "react-datetime/css/react-datetime.css";

class DatePicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false,
      configuration: {
        onChange: this.props.change,
        input: false,
        timeConstraints: { hours: { min: 7, max: 18, step: 1 } },
        defaultValue: moment()
      }
    }
  }
  close = () => {
    this.setState({ show: false });
  }
  open = () => { 
    this.setState({ show: true });
  }
  help = () => {
    this.setState({ show: !this.state.show })
  }
  render () {
    return (
      <div>
        <button onClick={this.help}><i className="fa fa-calendar"></i></button>
        <DateTime open={this.state.show} {...this.state.configuration} {...this.props.configuration}/>
      </div>
    );
  }
}

export default DatePicker;