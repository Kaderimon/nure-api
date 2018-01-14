import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import _ from 'lodash';

class Filter extends Component {
  render () {
    const {onFacultetSelect, onDepSelect, faculties, selector} = this.props;
    const facultet = _.find(faculties, {'id': Number(this.props.facultet)})
    const showSecondInput = this.props.facultet !== 'all';

    return (
      <div className="filter col-xs-4">
        <FormGroup controlId="formControlsSelect" className="col-xs-12">
          <ControlLabel className="dropdown-label">Выберите факультет</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={onFacultetSelect}>
            <option value={'all'}>All</option>
            {_.sortBy(faculties, ['short_name']).map((fac) => <option value={fac.id}>{fac.short_name}</option>)}
          </FormControl>
        </FormGroup>
        {showSecondInput && <FormGroup controlId="formControlsSelect" className="col-xs-12">
          <ControlLabel className="dropdown-label">Выберите кафедру</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={onDepSelect}>
            {_.get(facultet, selector, []).map((dep) => <option value={dep.id}>{dep.short_name}</option>)}
          </FormControl>
        </FormGroup>}
      </div>
    );
  }
}

export default Filter;