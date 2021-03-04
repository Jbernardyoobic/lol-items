import './App.css';
import ItemPage from './components/ItemPage/ItemPage';
import ChampionPage from './components/ChampionPage/ChampionPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {

  return (
    <div className="app">
      <Router>
        <div className='app-header'>
          <Link className='link' to='/'>Items</Link>
          <Link className='link' to='/champions'>Champions</Link>
        </div>
        <Switch>
          <Route exact path="/" component={ItemPage} />
          <Route exact path="/champions" component={ChampionPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;