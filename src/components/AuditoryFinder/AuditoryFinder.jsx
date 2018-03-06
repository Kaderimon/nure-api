import React, { Component } from 'react';
import DatePicker from '../../components/DatePicker/DatePicker';
import "react-datetime/css/react-datetime.css";

class AuditoryFinder extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  onDatePick = (props) => {
    console.log(props);
  }

  render () {
    return (
      <div className="col-xs-offset-1 col-xs-3 information-block">
        <DatePicker change={this.onDatePick} />
      </div>
    );
  }
}

export default AuditoryFinder;