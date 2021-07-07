import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import TodoListContainer from './pages/TodoListContainer';
import UsersListCotainer from './pages/UsersListContainer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route component={TodoListContainer} path="/" exact />
        <Route component={UsersListCotainer} path="/userslist" />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
