import React, {Component} from 'react';
import ItemList from './Components/ItemList';
import Navigation from './Components/Navigation';
import Categories from './Components/Categories';
import clothes from './Consts/clothes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css';

class App extends Component {

  constructor(props) { 
    super(props);
    this.state = {  

    }
  }

  render() {
    return (
      <div className="tc">
        <Navigation/>  
        <div className="main">
          <Categories/>
          <ItemList items={clothes}/>
        </div>
      </div>
    );
  }
}

export default App;

