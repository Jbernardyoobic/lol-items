import items from '../data/item.json';
import './DetailBar.css';
import ItemStats from './ItemStats';

const DetailBar = (props) => {
    const item = items[props.item];
    const path = `http://localhost:3000/items/${item.image.full}`;

    return (
        <div className='detail-bar-container'>
            <div className='image-container'>
                <img className='item-image' src={path} alt='img-tile'></img>
            </div>
            <div className='tags-container'>
                {item.tags.map((value, index) => <span key={index}>{value}</span>)}
                <span>{`Prix: ${item.gold.total}`}</span>
                <ItemStats stats={item.stats}></ItemStats>
            </div>
        </div>
    );
};

export default DetailBar;