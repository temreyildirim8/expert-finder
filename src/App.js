import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Success from "./Pages/Success/Success";
import Detail from './Pages/Detail/Detail';
import Entry from './Pages/Entry/Entry';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail">
          <Detail />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route exact path="/">
          <Entry />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
