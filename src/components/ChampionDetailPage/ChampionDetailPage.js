import championsFull from '../../data/fr_FR/championFull.json';
import './ChampionDetailPage.scss';
import { useLocation } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import Spell from '../Spell/Spell';
import ChampionStats from '../ChampionStats/ChampionStats';

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

    const urlPath = window.location.href.replace(window.location.pathname, '/');

    const path = `${urlPath}/img/champion/${championData.image.full}`;

    return (
        <div className='champ-detail'>
            <div className='champ-sidebar'>
                <div className='name-container'>
                    <span className='champion-name'>{championData.name}</span>
                </div>
                <div className='image-container'>
                    <img src={path} alt='whynot'></img>
                </div>
                <div className='info-container'>
                    <ProgressBar label='Attaque' value={championData.info.attack} color='red'></ProgressBar>
                    <ProgressBar label='Défense' value={championData.info.defense} color='green'></ProgressBar>
                    <ProgressBar label='Magie' value={championData.info.magic} color='dodgerblue'></ProgressBar>
                    <ProgressBar label='Difficulté' value={championData.info.difficulty} color='blueviolet'></ProgressBar>
                </div>
                <div className='stats-container'>
                    <ChampionStats stats={championData.stats}></ChampionStats>
                </div>
            </div>
            <div className='center-container'>
                <span className='heading'>Description</span>
                <div className='lore-container'>
                    <span className='champ-lore'>{championData.lore}</span>
                </div>
                <span className='heading'>Sorts</span>
                <div className='spells-container'>
                    {<Spell key={4} spell={championData.passive} isPassive={true} />}
                    {championData.spells.map((sp, idx) => <Spell spell={sp} key={idx}/>)}
                </div>
                <span className='heading'>{`Jouer avec ${championData.name}`}</span>
                <div className='tips-container'>
                    {championData.allytips.map((tip, idx) => <span key={idx}>{`- ${tip}`}</span>)}
                </div>
                <span className='heading'>{`Jouer contre ${championData.name}`}</span>
                <div className='tips-container'>
                    {championData.enemytips.map((tip, idx) => <span key={idx}>{`- ${tip}`}</span>)}
                </div>
            </div>
        </div>
    );
};

export default ChampionDetailPage;