import './ProgressBar.scss';

const ProgressBar = ({label, value, color}) => {
    return (
        <div className='progress-bar'>
            <div className='label'>
                <span>{label || 'Label'}</span>
            </div>
            <div className='progress-container'>
                <div className='progress' style={{width: `${value * 10}%`, backgroundColor: color}}></div>
            </div>
        </div>
    )
};

export default ProgressBar;