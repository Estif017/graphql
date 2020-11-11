import {BrowserRouter as Router,Route, Switch}from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import './App.css';
import MenuBar from './components/MenuBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <MenuBar/>
      <Switch>
        <Route exact path='/'><HomePage/></Route>
        <Route exact path='/register'><RegisterPage/></Route>
        <Route exact path='/login'><LoginPage/></Route>
      </Switch>
    </Router>
  );
}

export default App;
