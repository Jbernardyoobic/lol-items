import items from '../../data/fr_FR/item.json';
import './DetailBar.scss';

const DetailBar = (props) => {
    const item = items.data[props.item];

    const urlPath = window.location.href.replace(window.location.pathname, '/');

    const path = `${urlPath}/img/item/${item.image.full}`;

    return (
        <div className='detail-bar-container'>
            <div className='image-container'>
                <img className='item-image' src={path} alt='img-tile'></img>
            </div>
            <div className='info-container'>
                <span>{`Prix: ${item.gold.base}`}</span>
                <span>{`Prix Total: ${item.gold.total}`}</span>
            </div>
        </div>
    );
};

export default DetailBar;