import './ItemRecipe.scss';

const ItemRecipe = (props) => {
    let recipes = [];
    if (props.item.into) {
        for (let r of props.item.into) {
            recipes.push(r);
        }
    }

    let components = [];
    if (props.item.from) {
        for (let r of props.item.from) {
            components.push(r);
        }
    }

    const renderImg = (value, index) => {
        return <img className='small-image' alt='whynot' key={index} src={`http://localhost:3000/items/${value}.png`} ></img>
    }

    const renderContainer = (title) => {
        return (
            <div className='component-container'>
                <span>{title}</span>
                <div className='components'>
                    {title === 'Recettes' ? 
                        recipes.map((value, index) => renderImg(value, index)) :
                        components.map((value, index) => renderImg(value, index))}
                </div>
            </div>
        );
    };

    return (
        <div className='item-recipe-container'>
            {components.length > 0 && renderContainer('Composants')}
            {recipes.length > 0 && renderContainer('Recettes')}
        </div>
    )
}

export default ItemRecipe;