import './ItemStats.css';
import constants from '../data/constants.json';

const ItemStats = (props) => {
    let statNames = [];
    for (let i in props.stats) {
        statNames.push(i);
    }

    let flatGoldEffect = 0;
    statNames.map(name => {
        const stat = props.stats[name];
        const effect = constants[name];
        if (effect) {
            flatGoldEffect += effect.cost * stat;
        }
        return 0;
    });

    return (
        <div className='stats-container'>
            <span>{`Rendement Fixe : ${Math.round(flatGoldEffect)}`}</span>
        </div>
    );
};

export default ItemStats;