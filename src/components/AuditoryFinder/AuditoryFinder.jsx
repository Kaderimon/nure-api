import React, { Component } from 'react';
import DatePicker from '../../components/DatePicker/DatePicker';
import FEtable from '../../components/FEtable/FEtable';
import "react-datetime/css/react-datetime.css";
import { Button, ButtonGroup } from "react-bootstrap";
import moment from "moment";
import { config } from "../../config/config";
import Transport from "../../core/Requester";

class AuditoryFinder extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search: [],
      pairDateTime: moment().hours(7).minutes(45),
      isDataRequested: false
    }
  }

  onDatePick = (pairDateTime) => {
    this.setState({ pairDateTime })
  }

  onAuditorySearch = () => {
    this.setState({ isDataRequested: true });
    this.findFreeAuditory();
  }

  findFreeAuditory = async () => {
    const { pairDateTime } = this.state;
    const response = await Transport.post(config.apis.findFreeAuditory, {date: pairDateTime});
    this.setState({ 
      search: response || [],
      isDataRequested: false
    });
  }

  render () {
    const { isDataRequested } = this.state;
    return (
      <div className="flex col-xs-12">
        <div className="col-xs-offset-1 col-xs-3 information-block">
          <p>Выберите желаемое время</p>
          <DatePicker change={this.onDatePick} conf={{ input:true }} />
          <Button
            style={{margin: '5px'}}
            bsStyle="primary"
            onClick={this.onAuditorySearch}
            disabled={isDataRequested} >Найти</Button>
        </div>
        <FEtable
          data={this.state.search}
          root={'auditories'}
          history={this.props.history}
          isDataRequested={isDataRequested} />
      </div>
    );
  }
}

export default AuditoryFinder;