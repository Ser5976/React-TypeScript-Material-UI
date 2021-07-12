import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import TodoListContainer from './pages/TodoListContainer';
import PhotosListCotainer from './pages/PhotosListContainer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route component={TodoListContainer} path="/" exact />
        <Route component={PhotosListCotainer} path="/photoslist" />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
