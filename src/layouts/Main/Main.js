import React, { Component } from 'react';
import { Switch , Route } from 'react-router-dom'
import Header from '../../components/Header/Header';
import Transport from '../../core/Requester';
import './Main.css';
import Index from '../../pages/Home/Home';
import Groups from '../../pages/Groups/Groups';
import Teachers from '../../pages/Teachers/Teachers';
import Events from '../../pages/Events/Events';
import Auditories from '../../pages/Auditories/Auditories';
import NotFound from '../../pages/NotFound/404';
import { config } from '../../config/config.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculties: [],
      update: false
    }
  }

  componentDidMount() {
    this.fetchFaculties();
  }

  onServerUpdate = (status=true) => {
    this.setState({update: status});
  }

  async fetchFaculties () {
    const response = await Transport.get(config.apis.faculties);
    this.setState({faculties: response});
  }

  render() {
    return (
      <div className="App">
        <Header onServerUpdate={this.onServerUpdate}/>
        <div className="App-main">
          <Switch>
              <Route exact path="/" component={Index}/>
              <Route exact path="/groups" component={(props) => <Groups {...props} faculties={this.state.faculties}/>}/>
              <Route exact path="/teachers" component={(props) => <Teachers {...props} faculties={this.state.faculties}/>}/>
              <Route exact path="/auditories" component={Auditories}/>
              <Route exact path="/auditorie/:id" component={Events}/>
              <Route exact path="/group/:id" component={Events}/>
              <Route exact path="/teacher/:id" component={Events}/>
              <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
//<footer className="App-footer">
//  <p className="App-copy">Shupyliuk M.</p>
//</footer>