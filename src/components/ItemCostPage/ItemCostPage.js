import items from '../../data/fr_FR/item.json';
import { useState,  createRef } from 'react';
import PageTemplate from '../PageTemplate/PageTemplate';
import './ItemCostPage.scss';
import GoldGraph from '../GoldGraph/GoldGraph';

const ItemCostPage = () => {
    const urlPath = window.location.href.replace(window.location.pathname, '/');

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
      if (buildItems.includes(ev)) {
        return;
      }
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


    const renderBuild = () => {
      return (
        <div className={`build-container${pageState ? ' absolute' : ''}`}>
          {pageState && 
            <div className='btn-container'>
              <button className='hide-button' ref={btnRef} onClick={() => onButtonClick()} >Prev</button>
            </div>
          }
          {buildItems.map((item, index) => {
            if (item !== 0) {
              return (
                <div key={index} className='item-container full' ref={refs[index]} onClick={() => pageState ? null : onBuildItemSelect(index)}>
                  <img src={`${urlPath}/img/item/${items.data[item].image.full}`} alt='img-tile'></img>
                </div>
              )
            } else {
              return <div key={index} className='item-container empty' ref={refs[index]}></div>
            }
          })}
          {!pageState && 
            <div className='btn-container'>
              <button className='hide-button' ref={btnRef} onClick={() => onButtonClick()} >Next</button>
            </div>
          }
        </div>
      );
    }

    const renderItems = () => {
      return (
        <div className='outer-container'>
          <PageTemplate banIds={banIds} tagNames={TAGNAMES} gridSize='small' type='item' title='Cost' onGridItemSelect={onGridItemSelect}></PageTemplate>
          {renderBuild()}
        </div>
      )
    }

    const renderGraph = () => {
      return (
        <div className='graph-container'>
          <GoldGraph build={buildItems}/>
          {renderBuild()}
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