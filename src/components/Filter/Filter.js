import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import _ from 'lodash';
import './Filter.css';

class Filter extends Component {
  render () {
    const {onFacultetSelect, onDepSelect, faculties, selector} = this.props;
    const facultet = _.find(faculties, {'id': Number(this.props.facultet)});
    let dep = _.get(facultet, selector, []);
    const showSecondInput = this.props.facultet !== 'all';
    const defaultDep =  [{ id:'all', short_name:'All' }]
    dep = dep.length > 0 ? dep : defaultDep;

    return (
      <div className="filter col-xs-3">
        <FormGroup controlId="formControlsSelect" className="col-xs-12">
          <ControlLabel className="dropdown-label">Выберите факультет</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={onFacultetSelect}>
            <option value={'all'}>All</option>
            {_.sortBy(faculties, ['short_name']).map((fac,i) => <option key={`fac${i}`} value={fac.id}>{fac.short_name}</option>)}
          </FormControl>
        </FormGroup>
        {showSecondInput && <FormGroup controlId="formControlsSelect" className="col-xs-12">
          <ControlLabel className="dropdown-label">Выберите кафедру</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={onDepSelect}>
            {dep.map((dep,i) => <option key={`dep${i}`} value={dep.id}>{dep.short_name}</option>)}
          </FormControl>
        </FormGroup>}
      </div>
    );
  }
}

export default Filter;