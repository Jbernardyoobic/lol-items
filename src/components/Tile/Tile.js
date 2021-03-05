import './Tile.css';
import items from '../../data/item.json';
import champions from '../../data/champion.json';
import Popup from 'reactjs-popup';
import ItemDetail from '../ItemDetail/ItemDetail';
import { Link } from 'react-router-dom';

const Tile = ({item, type}) => {

    const data = type === 'items' ? items[item] : champions[item];

    const path = `http://localhost:3000/${type}/${data.image.full}`;

    const renderItem = () => {
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
        )
    };

    const renderChampion = () => {
        return (
            <>
                <Link className='tile-link' to={`/champions/${data.name}`}>
                    <div className='tile-container'>
                        <img className='item-image' src={path} alt='img-tile'></img>
                        <span className='item-name'>{data.name}</span>
                    </div>
                </Link>

            </>
        )
    }

    return (
        <>
            {type === 'items' ? renderItem() : renderChampion()}
        </>
    );
};

export default Tile;