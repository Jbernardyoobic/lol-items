import './App.css';
import ItemGrid from './components/ItemGrid';
import items from './data/item.json';

function App() {

  let itemIds = [];
  for (let it in items) {
    itemIds.push(it);
  }

  return (
    <div className="app">
      <ItemGrid items={items}/>
    </div>
  );
}

export default App;
