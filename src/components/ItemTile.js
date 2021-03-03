import './ItemTile.css';
import items from '../data/item.json';
import Popup from 'reactjs-popup';
import ItemDetail from './ItemDetail';

const ItemTile = (props) => {
    const item = items[props.item];

    const path = `http://localhost:3000/items/${item.image.full}`;

    return (
        <Popup
            trigger={
                <div className='tile-container'>
                    <img className='item-image' src={path} alt='img-tile'></img>
                    <span className='item-name'>{item.name}</span>
                </div>
            }
            modal
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">{item.name}</div>
                    <div className="content">
                        <ItemDetail item={props.item}/>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default ItemTile;