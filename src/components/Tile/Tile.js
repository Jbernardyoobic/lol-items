import './Tile.css';
import items from '../../data/item.json';
import champions from '../../data/champion.json';
import Popup from 'reactjs-popup';
import ItemDetail from '../ItemDetail/ItemDetail';

const Tile = ({item, type}) => {
    const data = type === 'items' ? items[item] : champions[item];

    const path = `http://localhost:3000/${type}/${data.image.full}`;

    return (
        <Popup
            trigger={
                <div className='tile-container'>
                    <img className='item-image' src={path} alt='img-tile'></img>
                    <span className='item-name'>{data.name}</span>
                </div>
            }
            modal
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">{data.name}</div>
                    <div className="content">
                        {type === 'items' && <ItemDetail item={item}/>}
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default Tile;