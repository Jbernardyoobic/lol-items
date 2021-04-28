import './InputBox.scss';

const InputBox = ({value, setValue, type = 'text', placeholder = 'Type to search...', max = 100}) => {
    return (
        <div className='search-box-container'>
            <input
                type={type}
                className='search-box'
                placeholder={placeholder}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                max={type === 'number' ? max : null}
            />
        </div>
    )
}

export default InputBox;