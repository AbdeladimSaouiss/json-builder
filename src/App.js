import React, { Component } from 'react';
import JsonEditor from './components/JsonEditor';

// Styles
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <JsonEditor />
      </div>
    );
  }
}

export default App;
