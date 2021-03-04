import ItemRow from '../ItemRow/ItemRow';
import './ItemGrid.css';
import { useState } from 'react';

const ItemGrid = (props) => {

    const [itemsByRow, setItemsbyRow] = useState(Math.floor(window.innerWidth / 250));

    const updateItemsbyRow = () => {
        setItemsbyRow(Math.floor(window.innerWidth / 250));
    }

    window.addEventListener('resize', updateItemsbyRow);

    let itemRows = [];
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