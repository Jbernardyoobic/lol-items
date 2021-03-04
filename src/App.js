import './App.css';
import ItemGrid from './components/ItemGrid/ItemGrid';
import items from './data/item.json';
import { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import Tag from './components/Tag/Tag';

function App() {

  const [ids, setIds] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const TAGNAMES = [
    'Boots',
    'SpellDamage',
    'Mana',
    'ManaRegen',
    'HealthRegen',
    'Health',
    'CriticalStrike',
    'Armor',
    'SpellBlock',
    'Lane',
    'Damage',
    'AttackSpeed',
    'OnHit',
    'LifeSteal',
    'Active',
    'CooldownReduction',
    'NonbootsMovement',
    'AbilityHaste',
    'MagicPenetration',
    'ArmorPenetration',
    'Aura',
    'SpellVamp',
    'Slow',
    'Tenacity',
    'Vision',
    'GoldPer',
    'Stealth'
  ];

  // TODO : Refactor
  useEffect(() => {
    console.log(tags);
    let tmpSearchIds = [];
    let tmpTagsIds = [];
    let searchActive = searchValue && searchValue.length > 0;
    let tagsActive = tags && tags.length > 0;
    for (let id in items) {
      if (!searchActive) {
        tmpSearchIds.push(id);
      } else {
        const sv = searchValue.toLowerCase();
        const name = items[id].name.toLowerCase();
        if (name?.includes(sv)) {
          tmpSearchIds.push(id);
        }
      }
      if (!tagsActive) {
        tmpTagsIds.push(id);
      } else {
        const itemTags = items[id].tags;
        const commonTags = itemTags.filter(tag => {
          if (tags.includes(tag)) {
            return tag;
          }
          return null;
        });
        if (tags.length === commonTags.length && tags.every(el => commonTags.includes(el))) {
          tmpTagsIds.push(id);
        }
      }
    }
    let finalIds = tmpSearchIds.filter(id => tmpTagsIds.indexOf(id) > -1);
    setIds(finalIds);
	}, [searchValue, tags]);

  const onTagChange = (event) => {
    if (event.target.checked) {
      let tmp = [...tags, event.target.alt];
      setTags(tmp);
    } else {
      let tmp = [...tags];
      const index = tmp.indexOf(event.target.alt);
      if (index > -1) {
        tmp.splice(index, 1);
      }
      setTags(tmp);
    }
  }

  return (
    <div className="app">
      <div className='app-header'>
        <span className='app-title'>LoL Items</span>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className='tags-container'>
          {TAGNAMES.map((name, index) => <Tag key={index} label={name} onCheckboxChange={onTagChange}></Tag>)}
        </div>
      </div>
      <ItemGrid itemIds={ids}/>
    </div>
  );
}

export default App;