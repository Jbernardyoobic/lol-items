import './App.css';
import ItemPage from './components/ItemPage/ItemPage';
import ChampionPage from './components/ChampionPage/ChampionPage';
import ItemCostPage from './components/ItemCostPage/ItemCostPage';
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
        <Link className='link' to='/cost'>Cost</Link>
      </div>
      <Switch>
        <Route exact path='/' component={ItemPage} />
        <Route exact path='/champions' component={ChampionPage} />
        <Route path='/champions/:id' component={ChampionDetailPage} />
        <Route exact path='/cost' component={ItemCostPage} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;