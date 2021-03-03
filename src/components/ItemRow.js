import ItemTile from './ItemTile';
import './ItemRow.css';

const ItemRow = (props) => {
    return (
        <div className="row-container">
            {props.items.map((item, index) => <ItemTile item={item} key={index}></ItemTile>)}
        </div>
    );
};

export default ItemRow;