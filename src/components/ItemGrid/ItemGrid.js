import ItemRow from '../ItemRow/ItemRow';
import './ItemGrid.css';

const ItemGrid = (props) => {
    let itemIds = [];
    for (let it in props.items) {
        itemIds.push(it);
    }

    console.log(itemIds.length);

    let itemRows = [];
    const itemsByRow = Math.floor(window.innerWidth / 225);
    for (let i = 0; i < itemIds.length; ++i) {
        let rowIds = [];
        for (let k = 0; k < itemsByRow && i < itemIds.length; ++k) {
            rowIds.push(itemIds[i]);
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