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

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));

const PrivateRoute = ({component: Component, token, ...rest}) => (
  <Route {...rest} render={(props) => (
    token ? <Component {...props} /> : <Redirect to='/login'/>
  )}/>
);

class App extends Component {

  render() {

    const token = localStorage.getItem(localStorageAuthKey);

    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>}/>
            <PrivateRoute path='/' name="Home" component={TheLayout} token={token}/>
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
