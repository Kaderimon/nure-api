import React, { PureComponent } from "react";
import {
  Col,
  Row,
  Button,
  ButtonGroup,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import _ from "lodash";
import core from "../../../core/core";

export default class FilterButton extends PureComponent {
  constructor(props) {
    super(props);
    const subjects = _.uniqBy(props.data, "subject.id");
    const types = _.uniqBy(props.data, "type.id");
    const groups = _.uniqBy(_.flatten(props.data.map(el => el.groups)), "id");
    this.state = {
      visible: false,
      subjectId: subjects[0] ? subjects[0].subject.id : '',
      typeId: '',
      groupId: '',
      subjects,
      types,
      groups
    };
  }

  componentWillReceiveProps(props) {
    const subjects = _.uniqBy(props.data, "subject.id");
    const types = _.uniqBy(props.data, "type.id");
    const groups = _.uniqBy(_.flatten(props.data.map(el => el.groups)), "id");
    this.setState({
      subjectId: subjects[0] ? subjects[0].subject.id : '',
      typeId: '',
      groupId: '',
      subjects,
      types,
      groups
    });
  }

  onSubjectPick = (e) => {
    this.setState({
      subjectId: e.target.value,
      typeId: this.state.types[0].type.id
    });
  };

  onTypePick = (e) => {
    this.setState({
      typeId: e.target.value,
      groupId: this.state.groups[0].id
    });
  };

  onGroupPick = (e) => {
    this.setState({ groupId: e.target.value });
  };

  onClear = () => {
    this.setState({
      subjectId: this.state.subjects[0].subject.id,
      typeId: null,
      groupId: null
    });
    this.props.onClear();
  }

  onApply = () => {
    const {subjectId, typeId, groupId} = this.state;
    this.props.onApply({
      subjectId,
      typeId,
      groupId
    });
  }

  triggerFilter = () => {
    this.setState({
      visible: !this.state.visible,
      subjectId: '',
      typeId: '',
      groupId: ''
    });
    this.props.onClear();
  };

  render() {
    const { displayType, data, onApply, onClear } = this.props;
    const { visible, subjectId, typeId, groupId, subjects, types, groups } = this.state;
    const isFilterEnabled = displayType !== "list";
    return (
      <div
        className={`c-filter ${!isFilterEnabled && visible ? "rdtOpen" : ""}`}
      >
        <div>
          <Button onClick={this.triggerFilter} disabled={isFilterEnabled}>
            <i className={`fa fa-filter fa-fw`} />
          </Button>
        </div>
        <div className="rdtPicker">
          <Col xs={12}>
            <FormGroup controlId="formControlsSelect" className="col-xs-12">
              Дисциплина
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.onSubjectPick}
              >
                {subjects.map((el, i) => (
                  <option key={`sub${i}`} value={el.subject.id}>
                    {el.subject.brief}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={12}>
            <FormGroup controlId="formControlsSelect" className="col-xs-12">
              Вид работы
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.onTypePick}
                defaultValue={null}
                disabled={core.empty(subjectId)}
                value={typeId}
              >
                <option key={`typeempty`} value={''}></option>
                {types.map((el, i) => (
                  <option key={`type${i}`} value={el.type.id}>
                    {el.type.short_name}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={12}>
            <FormGroup controlId="formControlsSelect" className="col-xs-12">
              Группа
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.onGroupPick}
                disabled={core.empty(typeId)}
                value={groupId}
              >
                <option key={`groupempty`} value={''}></option>
                {groups.map(
                  (el, i) => (
                    <option key={`group${i}`} value={el.id}>
                      {el.name}
                    </option>
                  )
                )}
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={12}>
            <ButtonGroup>
              <Button onClick={this.onApply}>Apply</Button>
              <Button onClick={this.onClear}>Clear</Button>
            </ButtonGroup>
          </Col>
        </div>
      </div>
    );
  }
}
