import './ItemRecipe.css';

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

    const renderComponents = () => {
        return (
            <div className='component-container'>
                <span>Composants</span>
                <div className='components'>
                    {components.map((value, index) => <img className='small-image' alt='whynot' key={index} src={`http://localhost:3000/items/${value}.png`} ></img>)}
                </div>
            </div>
        );
    }

    const renderRecipes = () => {
        return (
            <div className='component-container'>
                <span>Recettes</span>
                <div className='components'>
                    {recipes.map((value, index) => <img className='small-image' alt='whynot' key={index} src={`http://localhost:3000/items/${value}.png`} ></img>)}
                </div>
            </div>
        );
    }

    return (
        <div className='item-recipe-container'>
            {components.length > 0 && renderComponents()}
            {recipes.length > 0 && renderRecipes()}
        </div>
    )
}

export default ItemRecipe;