import items from '../data/item.json';
import DetailBar from './DetailBar';
import './ItemDetail.css';

const ItemDetail = (props) => {
    const item = items[props.item];
    
    // Every effect is separated by a <br> tag, replace them by |
    const regexbr = /<br>/ig;
    const brMarked = item.description.replaceAll(regexbr, '|');
    // Then remove every tag in the description
    const regex = /<[^>]*>/ig;
    const effects = (brMarked.replaceAll(regex, '')).split('|');
    // Trim and remove empty strings from array
    let effectsArray = effects.map(e => e.trim());
    effectsArray = effectsArray.filter(e => e.length > 0);

    return (
        <div className='outer-container'>
            <DetailBar item={props.item}></DetailBar>
            <div className='description-container'>
                {item.plaintext && <span className='plain-description'>{item.plaintext}</span>}
                {effectsArray.map((value, index) => <span key={index}>{value}</span>)}
            </div>
        </div>
    );
};

export default ItemDetail;