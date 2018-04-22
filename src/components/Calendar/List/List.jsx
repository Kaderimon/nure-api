import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { Col } from "react-bootstrap";

class List extends Component {
  renderLessons() {
    return this.props.data ? this.props.data.map((event, i) => {
      const { end_time, start_time, groups = [], auditory, type, subject } = event;
      return (
        <p key={`eventListItem${i}`}>
          {`${i + 1}. ${moment(end_time).format("DD.MM.YYYY")} ${moment(
            start_time
          ).format("HH:mm")}-${moment(end_time).format("HH:mm")},
          ${subject.brief}, ${type.short_name}, ${auditory}, ${groups
            .map(group => group.name)
            .join(" & ")}`}
        </p>
      );
    }) : <p>Ничего не найдено</p>
  }
  render() {
    return (
      <Col xs={12} style={{ textAlign: "left" }}>
        {this.renderLessons()}
      </Col>
    );
  }
}

export default List;
