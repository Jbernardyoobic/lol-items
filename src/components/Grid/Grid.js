import Row from '../Row/Row';
import './Grid.scss';
import { useState } from 'react';

const Grid = ({itemIds, type, size = 'large', onSelect}) => {

    const [itemsByRow, setItemsbyRow] = useState(Math.floor(window.innerWidth / (size === 'large' ? 250 : 150)));

    const updateItemsbyRow = () => {
        setItemsbyRow(Math.floor(window.innerWidth / (size === 'large' ? 250 : 150)));
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
            {itemRows.map((row, index) => <Row onSelect={onSelect} size={size} type={type} items={row} key={index}></Row>)}
        </div>
    );
};

export default Grid;