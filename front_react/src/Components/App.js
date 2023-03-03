// import logo from './logo.svg';
import React, {Component} from 'react';
import ItemList from './ItemList';
import clothes from '../Consts/clothes';
import '../CSS/App.css';

export default class App extends Component {

  render() {
    return (
      <div className="tc">
        <div className="Navigation">
          <div className="logo">
            <text> Give&Take </text>
          </div>
          <div className="menu">
            <text> Main </text>
            <text> About </text>
            <text> Profile </text>
          </div>
        </div>  
          <div>
            <ItemList items={clothes}/>
          </div>
      </div>
    );
  }
}
