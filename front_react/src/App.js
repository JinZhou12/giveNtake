import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemList from "./Components/ItemList";
import Navigation from "./Components/Navigation";
import Categories from "./Components/Categories";
import userProfile from "./Components/userProfile";
import clothes from "./Consts/clothes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="tc">
        <Navigation />
        <Router>
          <Routes>
            <Route path="/#personal">
              {/* <Main> */}
              <Categories />
              <ItemList items={clothes} />
              {/* </Main> */}
            </Route>
            <Route path="/#donation">{/* <Main /> */}</Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
