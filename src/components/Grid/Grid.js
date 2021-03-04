import Row from '../Row/Row';
import './Grid.css';
import { useState } from 'react';

const Grid = ({itemIds, type}) => {

    const [itemsByRow, setItemsbyRow] = useState(Math.floor(window.innerWidth / 250));

    const updateItemsbyRow = () => {
        setItemsbyRow(Math.floor(window.innerWidth / 250));
    }

    window.addEventListener('resize', updateItemsbyRow);

    let itemRows = [];
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
            {itemRows.map((row, index) => <Row type={type} items={row} key={index}></Row>)}
        </div>
    );
};

export default Grid;