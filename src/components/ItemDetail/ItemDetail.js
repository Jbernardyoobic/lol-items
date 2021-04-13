import items from '../../data/fr_FR/item.json';
import DetailBar from '../DetailBar/DetailBar';
import ItemRecipe from '../ItemRecipe/ItemRecipe';
import './ItemDetail.scss';

const ItemDetail = (props) => {
    const item = items.data[props.item];
    
    // Every effect is separated by a <br> tag, replace them by |
    const regexbr = /<br>/ig;
    const brMarked = item.description.replaceAll(regexbr, '|');
    // Then remove every other tag in the description
    const regex = /<[^>]*>/ig;
    // And split into an array using | as a separator
    const effects = (brMarked.replaceAll(regex, '')).split('|');
    // Trim and remove empty strings from array
    let effectsArray = effects.map(e => e.trim());
    effectsArray = effectsArray.filter(e => e.length > 0);

    return (
        <div className='item-detail-container'>
            <div className='horizontal-container'>
                <DetailBar item={props.item}></DetailBar>
                <div className='description-container'>
                    {item.plaintext && <span className='plain-description'>{item.plaintext}</span>}
                    {effectsArray.map((value, index) => <span key={index}>{value}</span>)}
                </div>
            </div>
            <div className='recipe-container'>
                <ItemRecipe item={item}></ItemRecipe>
            </div>
        </div>
    );
};

export default ItemDetail;