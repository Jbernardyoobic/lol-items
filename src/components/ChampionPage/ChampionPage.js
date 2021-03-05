import { useEffect, useState, useMemo, useCallback } from 'react';
import champions from '../../data/champion.json';
import Grid from '../Grid/Grid';
import Tag from '../Tag/Tag';
import SearchBox from '../SearchBox/SearchBox';

const ChampionPage = () => {
        
    const [names, setNames] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    
    const TAGNAMES = [
        'Tank', 'Fighter', 'Mage', 'Assassin', 'Support', 'Marksman'
    ];

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

    // Filter ids by tags value
    const tagSearch = useCallback(() => {
        if (tags && tags.length > 0) {
        let tmpTagsIds = [];
        for (let id in champions) {
            const itemTags = champions[id].tags;
            const commonTags = itemTags.filter(tag => tags.includes(tag) ? tag : null);
            if (tags.length === commonTags.length && tags.every(el => commonTags.includes(el))) {
            tmpTagsIds.push(id);
            }
        }
        return tmpTagsIds;
        } else {
        return champNames;
        }
    }, [tags, champNames]);

    // Filter ids by search value
    useEffect(() => {
        const tmpSearchIds = textSearch();
        const tmpTagsIds = tagSearch();
        setNames(tmpSearchIds.filter(id => tmpTagsIds.indexOf(id) > -1));
    }, [searchValue, textSearch, tagSearch]);

    const onTagChange = (event) => {
        if (event.target.checked) {
            setTags([...tags, event.target.alt]);
        } else {
            let tmp = [...tags];
            const index = tmp.indexOf(event.target.alt);
            if (index > -1) {
                tmp.splice(index, 1);
            }
            setTags(tmp);
        }
    }

    return (
        <div className="item-page">
            <div className='item-page-header'>
                <span className='item-page-title'>Champions</span>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                <div className='tags-container'>
                    {TAGNAMES.map((name, index) => <Tag key={index} label={name} onCheckboxChange={onTagChange}></Tag>)}
                </div>
            </div>
            <Grid itemIds={names} type='champions'/>
        </div>
    );
};

export default ChampionPage;