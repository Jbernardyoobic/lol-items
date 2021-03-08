import './Spell.scss';

const Spell = ({ spell, isPassive = false }) => {

    const urlPath = window.location.href.replace(window.location.pathname, '/');

    return (
        <div className='spell'>
            <span>{spell.name}</span>
            <img className='image' alt='whynot' src={`${urlPath}${isPassive ? 'passive' : 'spell'}/${spell.image.full}`} />
        </div>
    );
};

export default Spell;