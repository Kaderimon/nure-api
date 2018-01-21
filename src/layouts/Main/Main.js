import React, { Component } from 'react';
import { Switch , Route } from 'react-router-dom'
import Top from '../../components/Top/Top';
import Transport from '../../core/Requester';
import './Main.css';
import Index from '../../pages/Home/Home';
import Groups from '../../pages/Groups/Groups';
import Teachers from '../../pages/Teachers/Teachers';
import Events from '../../pages/Events/Events';
import NotFound from '../../pages/NotFound/404';
import { config } from '../../config/config.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculties: []
    }
  }

  componentDidMount() {
    this.fetchFaculties();
  }

  async fetchFaculties () {
    const response = await Transport.get(config.apis.faculties);
    this.setState({faculties: response});
  }

  render() {
    return (
      <div className="App">
        <Top />
        <div className="App-main">
          <Switch>
              <Route exact path="/" component={Index}/>
              <Route exact path="/groups" component={(props) => <Groups {...props} faculties={this.state.faculties}/>}/>
              <Route exact path="/teachers" component={(props) => <Teachers {...props} faculties={this.state.faculties}/>}/>
              <Route exact path="/groups/:id" component={Events}/>
              <Route exact path="/teachers/:id" component={Events}/>
              <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
        //<footer className="App-footer">
        //  <p className="App-copy">Shupyliuk M. && Roslyakov I. && Usachev V.</p>
        //</footer>