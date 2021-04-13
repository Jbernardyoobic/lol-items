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

    const urlPath = window.location.href.replace(window.location.pathname, '/');

    const renderImg = (value, index) => {
        return <img className='small-image' alt='whynot' key={index} src={`${urlPath}/img/item/${value}.png`} ></img>
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