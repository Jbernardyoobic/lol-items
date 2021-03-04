import './Tag.css';

const Tag = ({ label, onCheckboxChange }) => {
    return (
        <div className='tag'>
            <input type='checkbox' alt={label} onChange={onCheckboxChange}></input>
            <span>{label}</span>
        </div>
    );
};

export default Tag;