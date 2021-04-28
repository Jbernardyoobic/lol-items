import items from '../../data/fr_FR/item.json';
import { useState,  createRef } from 'react';
import PageTemplate from '../PageTemplate/PageTemplate';
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

    const btnRef = createRef();

    const [buildItems, setBuildItems] = useState([0, 0, 0, 0, 0, 0]);

    const [pageState, setPageState] = useState(false);

    const TAGNAMES = [
        'Boots', 'SpellDamage', 'Mana', 'ManaRegen', 'HealthRegen', 'Health',
        'CriticalStrike', 'Armor', 'SpellBlock', 'Damage', 'AttackSpeed',
        'OnHit', 'LifeSteal', 'NonbootsMovement', 'AbilityHaste', 'MagicPenetration',
        'ArmorPenetration', 'SpellVamp', 'Slow', 'Tenacity', 'Vision', 'GoldPer'
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
      setPageState(!pageState);
    }


    const renderItems = () => {
      return (
        <div className='outer-container'>
          <PageTemplate banIds={banIds} tagNames={TAGNAMES} gridSize='small' type='item' title='Cost' onGridItemSelect={onGridItemSelect}></PageTemplate>
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
            <div className='btn-container'>
              <button className='hide-button' ref={btnRef} onClick={() => onButtonClick()} >Next</button>
            </div>
          </div>
        </div>
      )
    }

    const renderGraph = () => {
      return (
        <div className='graph-container'>
          <div className='btn-container'>
            <button className='hide-button' ref={btnRef} onClick={() => onButtonClick()} >Prev</button>
          </div>
          {buildItems.map((item, index) => {
            if (item !== 0) {
              return (
                <div key={index} className='item-container full' ref={refs[index]}>
                  <img src={`${urlPath}/img/item/${items.data[item].image.full}`} alt='img-tile'></img>
                </div>
              )
            } else {
              return <div key={index} className='item-container empty' ref={refs[index]}></div>
            }
        })}
      </div>
      )
    }

    return (
      <div className='item-cost-page'>
        {pageState ? renderGraph() : renderItems()}
      </div>  
    );
}

export default ItemCostPage;