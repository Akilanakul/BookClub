import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import BookClubs from './components/BookClubs';
import Discussion from './components/Discussion';
import ReadingList from './components/ReadingList';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/book-clubs" component={BookClubs} />
          <PrivateRoute path="/discussion/:id" component={Discussion} />
          <PrivateRoute path="/reading-list" component={ReadingList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
