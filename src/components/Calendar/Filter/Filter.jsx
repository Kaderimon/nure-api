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

export default class FilterButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      subjectId: null,
      typeId: null,
      groupId: null
    };
  }

  onSubjectPick = (e) => {
    this.setState({ subjectId: e.target.value });
  };

  onTypePick = (e) => {
    this.setState({ typeId: e.target.value });
  };

  onGroupPick = (e) => {
    this.setState({ groupId: e.target.value });
  };

  onClear = () => {
    this.setState({
      subjectId: null,
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
      subjectId: null,
      typeId: null,
      groupId: null
    });
    this.props.onClear();
  };

  render() {
    const { displayType, data, onApply, onClear } = this.props;
    const { visible, subjectId, typeId, groupId } = this.state;
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
                {_.uniqBy(data, "subject.id").map((el, i) => (
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
                disabled={_.isNull(subjectId)}
              >
                {_.uniqBy(data, "type.id").map((el, i) => (
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
                disabled={_.isNull(subjectId) && _.isNull(typeId)}
              >
                {_.uniqBy(_.flatten(data.map(el => el.groups)), "id").map(
                  (el, i) => (
                    <option key={`type${i}`} value={el.id}>
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
