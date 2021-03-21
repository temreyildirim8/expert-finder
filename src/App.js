import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
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
        <Route exact path="/">
          <Entry />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
