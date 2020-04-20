import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route link="/" component={Home} />
        <Route link="/about" exact component={About} />
      </Switch>
    </div>
  );
}

export default App;
