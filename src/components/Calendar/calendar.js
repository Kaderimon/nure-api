import React, { PureComponent } from 'react';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import "./calendar.css"

class Calendar extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      data: [{"subject_id":6494720,"start_time":1504260600,"end_time":1504266300,"type":0,"number_pair":4,"auditory":"406и","teachers":[],"groups":[4801962 ,4801938 ,6541634 ]} ,
      {"subject_id":5493804,"start_time":1504526100,"end_time":1504531800,"type":0,"number_pair":5,"auditory":"_504и","teachers":[813],"groups":[4801938 ,4801962 ,6541634 ]} ,
      {"subject_id":5493804,"start_time":1504532400,"end_time":1504538100,"type":0,"number_pair":6,"auditory":"_504и","teachers":[813],"groups":[4801962 ,6541634 ,4801938 ]} ,
      {"subject_id":2045853,"start_time":1504606200,"end_time":1504611900,"type":0,"number_pair":4,"auditory":"412и","teachers":[2091141],"groups":[4801962 ,4801938 ,6541634 ]} ,
      {"subject_id":1052901,"start_time":1504612500,"end_time":1504618200,"type":0,"number_pair":5,"auditory":"408и","teachers":[742],"groups":[4801938 ,4801962 ,6541634 ]} ,
      {"subject_id":1052901,"start_time":1504618800,"end_time":1504624500,"type":10,"number_pair":6,"auditory":"408и","teachers":[742],"groups":[4801938 ,6541634 ]} ,
      {"subject_id":4306904,"start_time":1504772100,"end_time":1504777800,"type":0,"number_pair":3,"auditory":"_504и","teachers":[813],"groups":[4801962 ,4801938 ,6541634 ]} ,
      {"subject_id":4306904,"start_time":1504779000,"end_time":1504784700,"type":0,"number_pair":4,"auditory":"_504и","teachers":[813],"groups":[6541634 ,4801938 ,4801962 ]} ,
      {"subject_id":1021810,"start_time":1504785300,"end_time":1504791000,"type":0,"number_pair":5,"auditory":"410и","teachers":[1269563],"groups":[4801938 ,6541634 ,4801962 ]}],
      currentWeek: "11 сентября - 21 сентября"
    }
  }
  componentDidMount() {

  }
  nextWeek = (e) => {
    this.setState({
      currentWeek: "21 сентября - 31 сентября"
    });
  }
  previousWeek = (e) => {
    this.setState({
      currentWeek: "1 сентября - 10 сентября"
    });
  }
  currentWeek = (e) => {
    this.setState({
      currentWeek: "11 сентября - 21 сентября"
    });
  }

  render () {
    return (
      <div className="calendar">
        <div className="c-control">
          <ButtonGroup>
            <Button onClick={this.previousWeek}><i className="fa fa-arrow-left fa-fw"></i></Button> 
            <Button onClick={this.currentWeek}><i className="fa fa-dot-circle-o fa-fw"></i></Button>
            <Button onClick={this.nextWeek}><i className="fa fa-arrow-right fa-fw"></i></Button>
          </ButtonGroup>
          <div className="c-control__info">
            {this.state.currentWeek}
          </div>
        </div>
        <div className="c-table row">
          <div className="col-xs-12">        
            <Header />
          </div>
          <div className="col-xs-12">
            <Sidebar />
            <Main />
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;