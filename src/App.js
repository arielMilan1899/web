import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import {localStorageAuthKey} from "./config";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

class App extends Component {

  render() {

    const token = localStorage.getItem(localStorageAuthKey);

    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route path='/' name="Home" component={TheLayout}/>
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
