// import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="Navigation">
          <div className="logo">
            <text > Give&Take </text>
          </div>
          <div className="menu">
            <text > Main </text>
            <text > About </text>
            <text > Profile </text>
          </div>
        </div>  
      </div>
    );
  }
}
