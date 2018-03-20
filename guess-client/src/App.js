import React, { Component } from 'react';
import './App.css';

// Components
import Header from './Header';
import Panel from './Panel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Guess Game" />
        <Panel />
      </div>
    );
  }
}

export default App;
