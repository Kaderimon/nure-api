import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class PerPagePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
        perPage: props.perPage || this.defaultPerPage
    };
  }

  get defaultPerPage () {
    return 10;
  }

  onPerPageChange = (e) => {
    const { onPerPageChange=()=>{} } = this.props;
    const perPage = parseInt(e.target.value, 10);

    onPerPageChange(perPage);
    this.setState({ perPage });
  }

  render() {
    return (
      <div className="perPagePicker pagination">
          <FormGroup controlId="formControlsSelect">
              <FormControl componentClass="select" onChange={this.onPerPageChange} defaultValue={this.state.perPage}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="40">50</option>
                  <option value="100">100</option>
              </FormControl>
          </FormGroup>
      </div>
    )
  }
}

export default PerPagePicker;