import championsFull from '../../data/championFull.json';
import './ChampionDetailPage.scss';
import { useLocation } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';

const ChampionDetailPage = () => {

    const { pathname } = useLocation();

    const getChampionName = () => {
        let championName = pathname.split('/').pop().replace(' ', '').replace('.', '').replace('é', 'e');
        if (championName === 'Nunuet Willump') return 'Nunu';
        if (championName === 'MaîtreYi') return 'MasterYi';
        if (championName === 'LeBlanc') return 'Leblanc';
        if (championName.includes('\'')) {
            const index = championName.indexOf('\'');
            championName = championName.replace('\'', '');
            if (championName === 'KogMaw' || championName === 'RekSai') return championName;
            let tmp = '';
            for (let i = 0; i < championName.length; ++i) {
                let char = championName[i];
                if (i === index) {
                    char = char.toLowerCase();
                }
                tmp += char;
            }
            championName = tmp;
        }
        return championName
    }

    const championName = getChampionName();

    const championData = championsFull.data[championName];

    console.log(championData);

    return (
        <div className='champ-detail'>
            <div className='champ-sidebar'>
                <div className='name-container'>
                    <span className='champion-name'>{championData.name}</span>
                </div>
                <div className='image-container'>
                    <img src={`http://localhost:3000/champions/${championData.image.full}`} alt='whynot'></img>
                </div>
                <div className='info-container'>
                    <ProgressBar label='Attaque' value={championData.info.attack} color='red'></ProgressBar>
                    <ProgressBar label='Défense' value={championData.info.defense} color='green'></ProgressBar>
                    <ProgressBar label='Magie' value={championData.info.magic} color='dodgerblue'></ProgressBar>
                    <ProgressBar label='Difficulté' value={championData.info.difficulty} color='blueviolet'></ProgressBar>
                    {/* <ProgressBar variant='succes' now={championData.info.attack} min={0} max={10} />
                    <ProgressBar variant='info' now={championData.info.defense} min={0} max={10} />
                    <ProgressBar variant='warning' now={championData.info.magic} min={0} max={10} />
                    <ProgressBar variant='danger' now={championData.info.difficulty} min={0} max={10} /> */}
                </div>
            </div>
            <div className='center-container'>
                <span className='champ-lore'>{championData.lore}</span>
            </div>
        </div>
    );
};

export default ChampionDetailPage;