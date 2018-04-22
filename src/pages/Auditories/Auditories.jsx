import React, { Component } from 'react';
import Transport from '../../core/Requester';
import PageHead from '../../components/PageHead/PageHead';
import FEtable from '../../components/FEtable/FEtable';
import AuditoryFinder from '../../components/AuditoryFinder/AuditoryFinder';
import { config } from '../../config/config.js';
import _ from 'lodash';
import core from '../../core/core';

class Auditories extends Component {
  constructor (props) {
    super(props);
    this.state = {
      auditories: [],
      search: [],
      facultet: 'all',
      department: 'all',
    }
  }

  componentDidMount() {
    core.saveLocal('event', {id:'', type: 'auditories'}, true);
    this.fetchAuditories();
  }

  async fetchAuditories () {
    const response = await Transport.get(config.apis.auditories);
    this.setState({auditories: response, search: response});
  }

  search = (val) => {
    if (val !== '') {
        this.setState({
            search: _.filter(this.state.auditories, data => {
                return this.found(data, 'short_name', val) || this.found(data, 'id', val);
            })
        });
    } else {
      this.setState({
        search: _.cloneDeep(this.state.auditories)
      });
    }
  }

  found = (data, field, compareVal) => {
      return _.includes(_.toLower(data[field]), _.toLower(compareVal));
  }

  render () {
    return (
      <div className="auditories">
        <PageHead title="Аудитории" onChange={this.search} />
        <div className="flex col-xs-12">
          <FEtable
            data={this.state.search}
            root={'auditorie'}
            history={this.props.history}/>
        </div>
        <div className="col-xs-offset-1 col-xs-10 page-header">
            <h1 className="App-title">Поиск свободной аудитории</h1>
        </div>
        <AuditoryFinder history={this.props.history}/>
      </div>
    );
  }
}

export default Auditories;