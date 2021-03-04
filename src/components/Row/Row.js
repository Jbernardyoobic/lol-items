import Tile from '../Tile/Tile';
import './Row.css';

const Row = ({items, type}) => {
    return (
        <div className="row-container">
            {items.map((item, index) => <Tile item={item} type={type} key={index}></Tile>)}
        </div>
    );
};

export default Row;