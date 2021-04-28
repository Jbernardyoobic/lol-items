import { useMemo, useState, useCallback } from "react";
import items from '../../data/fr_FR/item.json';
import InputBox from "../SearchBox/InputBox";
import './GoldGraph.scss';

const GoldGraph = ({build = []}) => {
    const urlPath = window.location.href.replace(window.location.pathname, '/');

    const initCost = useCallback(() => {
        if (build.length > 0) {
            let c = [];
            let p = 0;
            for (let id of build) {
                if (id !== 0) {
                    p += items.data[id].gold.total;
                    c.push(p);
                }
            }
            return c;
        }
        return 0;
    }, [build]);

    const cost = useMemo(() => initCost(), [initCost]);

    const [percentage, setPercentage] = useState(100);

    const getSec = (time) => {
      return time % 60;
    }

    const getCreep = (value, size) => {
        const c = percentage / 100;
        let g = 0;
        for (let i = 0; i < size; i++) {
            let r = Math.random();
            if (r <= c) {
                g += value;
            }
        }
        return g;
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

    const getTimeCost = (goal) => {
      let time = 0;
      let wave = 0;
      let gold = 0;
      let upgradeIndex = 0;
      const upgrades = [125, 215, 305, 395, 485, 575, 665, 755, 845, 935, 1025];
      const casterGold = 14;
      const meleeGold = 21;
      let cannonGold = 57;
      const passiveGold = 20.4;

      for (; time <= 11999 && gold < goal; time++) {
        if (time % 10 === 0 && time > 110) {
            gold += passiveGold;
        }
        if (getSec(time) === 5 || getSec(time) === 35) {
            wave++;
            gold += getCreep(casterGold, 3);
            gold += getCreep(meleeGold, 3);
            if (isCannonHere(wave, time)) {
                if (upgradeIndex < upgrades.length && time >= upgrades[upgradeIndex]) {
                    cannonGold += 3;
                    upgradeIndex++;
                }
                gold += getCreep(cannonGold, 1);
            }
        }
        Math.round(gold);
      }

      return time;
    }

    const secToMin = (time) => {
        let s = (time % 60).toString();
        if (s.length === 1) {
            s = '0' + s;
        }
        let m = (Math.floor(time/60));
        let h = '';
        if (m > 59) {
            h = (Math.floor(m/60)).toString() + ':';
            m = (m % 60).toString() + ':';
        } else {
            m = m.toString() + ':';
        }
        return h + m + s;
    }

    return (
        <div className='gold-graph-container'>
            <div className='percentage-container'>
                <span>Last hit percentage</span>
                <InputBox value={percentage} setValue={setPercentage} type='number' placeholder={1}/>
            </div>
            <div className='build-container'>
                {build.map((item, index) => {
                    if (item && item !== 0) {
                        return (
                            <div key={index} className='item-container'>
                                <img src={`${urlPath}/img/item/${items.data[item].image.full}`} alt='img-tile' />
                                <span>{secToMin(getTimeCost(cost[index]))}</span>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default GoldGraph;