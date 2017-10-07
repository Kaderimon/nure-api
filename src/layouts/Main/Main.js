import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
