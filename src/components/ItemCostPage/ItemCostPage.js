import Grid from '../Grid/Grid';
import items from '../../data/fr_FR/item.json';
import { useState, useEffect, useMemo, useCallback, createRef } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Tag from '../Tag/Tag';
import './ItemCostPage.scss';

const ItemCostPage = () => {
    const urlPath = window.location.href.replace(window.location.pathname, '/');

    let gold = 0;
    const percentage = 1;

    const getSec = (time) => {
      return time % 60;
    }

    const getCreep = (value, size) => {
      for (let i = 0; i < size; i++) {
        let r = Math.random();
        if (r <= percentage) {
          gold += value;
        }
      }
    }

    const isCannonHere = (wave, time) => {
      if (time <= 900) {
        return wave % 3 === 0;
      } else if (time <= 1500) {
        return wave % 2 === 0;
      } else {
        return true;
      }
    }

    const test = () => {
      let time = 0;
      let wave = 0;
      let upgradeIndex = 0;
      const upgrades = [125, 215, 305, 395, 485, 575, 665, 755, 845, 935, 1025];
      const casterGold = 14;
      const meleeGold = 21;
      let cannonGold = 57;
      const passiveGold = 20.4;

      for (; time <= 3600; time++) {
        if (time % 10 === 0 && time > 110) {
          gold += passiveGold;
        }
        if (getSec(time) === 5 || getSec(time) === 35) {
          wave++;
          getCreep(casterGold, 3);
          getCreep(meleeGold, 3);
          if (isCannonHere(wave, time)) {
            if (upgradeIndex < upgrades.length && time >= upgrades[upgradeIndex]) {
              cannonGold += 3;
              upgradeIndex++;
            }
            getCreep(cannonGold, 1);
          }
        }
      }
    }

    test();

    let ref1 = createRef();
    let ref2 = createRef();
    let ref3 = createRef();
    let ref4 = createRef();
    let ref5 = createRef();
    let ref6 = createRef();

    let refs = [ref1, ref2, ref3, ref4, ref5, ref6];

    const itemsRef = createRef();
    const btnRef = createRef();

    const [buildItems, setBuildItems] = useState([0, 0, 0, 0, 0, 0]);
    const [ids, setIds] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const TAGNAMES = [
        'Boots', 'SpellDamage', 'Mana', 'ManaRegen', 'HealthRegen', 'Health',
        'CriticalStrike', 'Armor', 'SpellBlock', 'Lane', 'Damage', 'AttackSpeed',
        'OnHit', 'LifeSteal', 'Active', 'CooldownReduction', 'NonbootsMovement',
        'AbilityHaste', 'MagicPenetration', 'ArmorPenetration', 'Aura',
        'SpellVamp', 'Slow', 'Tenacity', 'Vision', 'GoldPer', 'Stealth'
    ];
    
    const banIds = [
      '2010', '2031', '2003', '2033', '2051', '2052', '3330', '3340', '3364', '4638', '2055',
      '4641', '4643', '2138', '2139', '2140', '2422', '2419', '2421', '2423', '2424', '3042',
      '3112', '3363', '3400', '3599', '3600', '3513', '4403', '3177', '2403', '3040', '3184',
      //
      '1001', '1004', '1006', '1011', '1018', '1026', '1058', '1027', '1028', '1029', '1031',
      '1033', '1057', '1083', '1054', '1055', '1056', '1036', '1037', '1042', '1038', '1035',
      '1039', '1043', '1052', '1053', '1082', '2015', '2420', '3024', '3035', '3044', '3051',
      '3057', '3066', '3067', '3070', '6677', '6670', '6660', '6029', '4642', '4635', '3076',
      '3077', '3082', '3086', '3105', '3108', '3113', '3114', '3123', '3133', '3134', '3140',
      '3145', '3155', '4630', '4632', '3916', '3862', '3863', '3858', '3859', '3854', '3855',
      '3850', '3851', '3801', '3802', '3211'
    ];
  
    // Store all ids in one array
    const initItemIds = () => {
        let tmp = [];
        for (let id in items.data) {
            if (!banIds.includes(id)) {
                tmp.push(id);
            }
        }
        return tmp;
    }

    const itemIds = useMemo(() => initItemIds(), []);

    // Filter ids by search value
    const textSearch = useCallback(() => {
        if (searchValue && searchValue.length > 0) {
            let tmpSearchIds = [];
            for (let id in items.data) {
                const name = items.data[id].name.toLowerCase();
                if (name?.includes(searchValue.toLowerCase())) {
                    tmpSearchIds.push(id);
                }
            }
            return tmpSearchIds;
        } else {
            return itemIds;
        }
    }, [searchValue, itemIds]);

    // Filter ids by tags value
    const tagSearch = useCallback(() => {
        if (tags && tags.length > 0) {
            let tmpTagsIds = [];
            for (let id in items.data) {
                const itemTags = items.data[id].tags;
                const commonTags = itemTags.filter(tag => tags.includes(tag) ? tag : null);
                if (tags.length === commonTags.length && tags.every(el => commonTags.includes(el))) {
                    tmpTagsIds.push(id);
                }
            }
            return tmpTagsIds;
        } else {
            return itemIds;
        }
    }, [tags, itemIds]);

    // Filter ids by tags and search value
    useEffect(() => {
        const tmpSearchIds = textSearch();
        const tmpTagsIds = tagSearch();
        setIds(tmpSearchIds.filter(id => tmpTagsIds.indexOf(id) > -1));
    }, [searchValue, textSearch, tagSearch]);

    const onTagChange = (event) => {
        if (event.target.checked) {
            setTags([...tags, event.target.alt]);
        } else {
            let tmp = [...tags];
            const index = tmp.indexOf(event.target.alt);
            if (index > -1) {
                tmp.splice(index, 1);
            }
            setTags(tmp);
        }
    }

    const onGridItemSelect = (ev) => {
      let currentRef;
      for (let i = 0; i < 6; i++) {
        if (refs[i].current.className.includes('empty')) {
          currentRef = i;
          break;
        }
      }
      if (currentRef !== undefined && currentRef !== null) {
        let tmp = [];
        for (let i = 0; i < 6; i++) {
          tmp.push(buildItems[i]);
        }
        tmp[currentRef] = ev;
        setBuildItems(tmp);
      }
    }

    const onBuildItemSelect = (ev) => {
      let tmp = [];
      for (let i = 0; i < 6; i++) {
        tmp.push(buildItems[i]);
      }
      tmp[ev] = 0;
      setBuildItems(tmp);
    }

    const onButtonClick = () => {
      if (itemsRef.current.className.includes('hidden')) {
        itemsRef.current.className = 'items-container';
        itemsRef.current.style.display = 'flex';
        btnRef.current.innerHTML = 'Next';
      } else {
        itemsRef.current.className = 'items-container hidden';
        itemsRef.current.style.display = 'none';
        btnRef.current.innerHTML = 'Prev';
      }
    }

    return (
      <div className='item-cost-page'>
        <div className='items-container' ref={itemsRef}>
          <div className='item-page-header'>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className='tags-container'>
              {TAGNAMES.map((name, index) => <Tag key={index} label={name} onCheckboxChange={onTagChange}></Tag>)}
            </div>
          </div>
          <Grid onSelect={onGridItemSelect} itemIds={ids} type='item' size='small'/>
        </div>
        <button className='hide-button' ref={btnRef} onClick={() => onButtonClick()} >Next</button>
        <div className='build-container'>
          {buildItems.map((item, index) => {
            if (item !== 0) {
              return (
                <div key={index} className='item-container full' ref={refs[index]} onClick={() => onBuildItemSelect(index)}>
                  <img src={`${urlPath}/img/item/${items.data[item].image.full}`} alt='img-tile'></img>
                </div>
              )
            } else {
              return <div key={index} className='item-container empty' ref={refs[index]}></div>
            }
          })}
        </div>
      </div>  
    );
}

export default ItemCostPage;