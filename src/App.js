import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemPage from './components/ItemPage/ItemPage';
import ChampionPage from './components/ChampionPage/ChampionPage';
import ChampionDetailPage from './components/ChampionDetailPage/ChampionDetailPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className='app'>
      <div className='app-header'>
        <Link className='link' to='/'>Items</Link>
        <Link className='link' to='/champions'>Champions</Link>
      </div>
      <Switch>
        <Route exact path='/' component={ItemPage} />
        <Route exact path='/champions' component={ChampionPage} />
        <Route path='/champions/:id' component={ChampionDetailPage} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;