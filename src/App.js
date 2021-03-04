import './App.css';
import ItemGrid from './components/ItemGrid/ItemGrid';
import items from './data/item.json';
import { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox/SearchBox';

function App() {

  const [ids, setIds] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let tmpIds = []
    for (let id in items) {
      if (!searchValue || searchValue?.length === 0) {
        tmpIds.push(id);
      } else {
        const sv = searchValue.toLowerCase();
        const name = items[id].name.toLowerCase();
        if (name?.includes(sv)) {
          tmpIds.push(id);
        }
      }
    }
    setIds(tmpIds);
	}, [searchValue]);
  
  // let itemIds = [];
  // for (let it in items) {
  //   itemIds.push(it);
  // }

  return (
    <div className="app">
      <div className='app-header'>
        <span className='app-title'>LoL Items</span>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <ItemGrid itemIds={ids}/>
    </div>
  );
}

export default App;
