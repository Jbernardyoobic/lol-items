import championsFull from '../../data/championFull.json';
import './ChampionDetailPage.css';
import { useLocation } from 'react-router-dom';

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

    const path = `http://localhost:3000/champions/${championData.image.full}.png`;

    console.log(championData, path);

    return (
        <div className='champ-detail'>
            <div className='name-container'>
                <span className='champion-name'>{championData.name}</span>
            </div>
            <div className='image-container'>
                <img src={`http://localhost:3000/champions/${championData.image.full}`} alt='whynot'></img>
            </div>
        </div>
    );
};

export default ChampionDetailPage;