import Tile from '../Tile/Tile';
import './Row.scss';

const Row = ({items, type, size = 'large', onSelect}) => {
    return (
        <div className="row-container">
            {items.map((item, index) => <Tile onSelect={onSelect} size={size} item={item} type={type} key={index}></Tile>)}
        </div>
    );
};

export default Row;