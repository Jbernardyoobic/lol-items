import './Tile.scss';
import items from '../../data/fr_FR/item.json';
import champions from '../../data/fr_FR/champion.json';
import Popup from 'reactjs-popup';
import ItemDetail from '../ItemDetail/ItemDetail';
import { Link } from 'react-router-dom';

const Tile = ({item, type}) => {

    const data = type === 'item' ? items.data[item] : champions.data[item];

    const urlPath = window.location.href.replace(window.location.pathname, '/');

    const path = `${urlPath}/img/${type}/${data.image.full}`;

    const renderItem = () => {
        return (
            <Popup
                trigger={
                    <div className='tile-container'>
                        <img src={path} alt='img-tile'></img>
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
                            {type === 'item' && <ItemDetail item={item}/>}
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
                        <img src={path} alt='img-tile'></img>
                        <span className='item-name'>{data.name}</span>
                    </div>
                </Link>

            </>
        )
    }

    return (
        <>
            {type === 'item' ? renderItem() : renderChampion()}
        </>
    );
};

export default Tile;