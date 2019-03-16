import React, { Component } from 'react';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div>
        <div className="header" >
          <div className="container">
            <h1 className="header__title">News Lister</h1>
          </div>
        </div>
        <Routes />
      </div>
    );
  }
}

export default App;