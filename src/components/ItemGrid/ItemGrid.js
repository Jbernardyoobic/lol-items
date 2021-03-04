import ItemRow from '../ItemRow/ItemRow';
import './ItemGrid.css';

const ItemGrid = (props) => {
    let itemRows = [];
    const itemsByRow = Math.floor(window.innerWidth / 250);
    for (let i = 0; i < props.itemIds.length; ++i) {
        let rowIds = [];
        for (let k = 0; k < itemsByRow && i < props.itemIds.length; ++k) {
            rowIds.push(props.itemIds[i]);
            ++i;
        }
        --i;
        itemRows.push(rowIds);
    }

    return (
        <div className="grid-container">
            {itemRows.map((row, index) => <ItemRow items={row} key={index}></ItemRow>)}
        </div>
    );
};

export default ItemGrid;