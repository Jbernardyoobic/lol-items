import './SearchBox.scss';

const SearchBox = (props) => {
    return (
        <div className='search-box-container'>
            <input
                className='search-box'
                placeholder='Type to search...'
                value={props.value}
                onChange={(event) => props.setSearchValue(event.target.value)}
            />
        </div>
    )
}

export default SearchBox;