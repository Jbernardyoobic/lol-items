import './Spell.scss';

const Spell = ({ spell, isPassive = false }) => {
    return (
        <div className='spell'>
            <span>{spell.name}</span>
            <img className='image' alt='whynot' src={`http://localhost:3000/${isPassive ? 'passive' : 'spell'}/${spell.image.full}`} />
        </div>
    );
};

export default Spell;