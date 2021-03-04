import { useEffect, useState, useMemo, useCallback } from 'react';
import champions from '../../data/champion.json';
import Grid from '../Grid/Grid';
import SearchBox from '../SearchBox/SearchBox';

const ChampionPage = () => {
        
    const [names, setNames] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    
    // Store all names in one array
    const initNames = () => {
        let tmp = [];
        for (let name in champions) {
            tmp.push(name);
        }
        return tmp;
    }
    const champNames = useMemo(() => initNames(), []);

    // Filter ids by search value
    const textSearch = useCallback(() => {
        if (searchValue && searchValue.length > 0) {
            let tmpSearchIds = [];
            for (let id in champions) {
                const name = champions[id].name.toLowerCase();
                if (name?.includes(searchValue.toLowerCase())) {
                    tmpSearchIds.push(id);
                }
            }
            return tmpSearchIds;
        } else {
            return champNames;
        }
    }, [searchValue, champNames]);

    // Filter ids by search value
    useEffect(() => {
        const tmpSearchIds = textSearch();
        setNames(tmpSearchIds);
    }, [searchValue, textSearch]);

    return (
        <div className="item-page">
            <div className='item-page-header'>
                <span className='item-page-title'>Champions</span>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <Grid itemIds={names} type='champions'/>
        </div>
    );
};

export default ChampionPage;