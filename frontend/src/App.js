import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import MainPage from './MainPage'; // Your "Find a Pet" component
import Home from './Home'; // Your Home component
import About from './About'; // Your About component

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/find-a-pet" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
