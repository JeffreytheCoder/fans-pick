import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Alert from './components/Alert';

// redux routes
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        {/* <Route exact path='/' component={Landing} /> */}
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path='/my-pages' component={MyPages} />
          <Route exact path='/following' component={Following} />
          <Route exact path='/me' component={Me} /> */}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
