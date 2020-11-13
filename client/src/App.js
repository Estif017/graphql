import {BrowserRouter as Router,Route, Switch}from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import './App.css';
import MenuBar from './components/MenuBar';
import AuthSelectors from './context/authContext/AuthSelectors';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthSelectors>
      <Router>
        <MenuBar/>
        <Switch>
          <Route exact path='/'><HomePage/></Route>
          <Route exact path='/register'><RegisterPage/></Route>
          <Route exact path='/login'><LoginPage/></Route>
        </Switch>
      </Router>
    </AuthSelectors>
  );
}

export default App;
