import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

function App() {
  return (
    <Router>
      <Route exact patch="/" component={ Home } />
      <Route patch="/:id" component={ Detail } />
    </Router>
  );
}

export default App;
