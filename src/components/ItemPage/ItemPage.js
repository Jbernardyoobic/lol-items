import Grid from '../Grid/Grid';
import items from '../../data/fr_FR/item.json';
import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Tag from '../Tag/Tag';
import './ItemPage.scss';

const ItemPage = () => {
    
    const [ids, setIds] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const TAGNAMES = [
        'Boots', 'SpellDamage', 'Mana', 'ManaRegen', 'HealthRegen', 'Health',
        'CriticalStrike', 'Armor', 'SpellBlock', 'Lane', 'Damage', 'AttackSpeed',
        'OnHit', 'LifeSteal', 'Active', 'CooldownReduction', 'NonbootsMovement',
        'AbilityHaste', 'MagicPenetration', 'ArmorPenetration', 'Aura',
        'SpellVamp', 'Slow', 'Tenacity', 'Vision', 'GoldPer', 'Stealth'
    ];

    const banIds = [
        '2010', '2031', '2003', '2033', '2051', '2052', '3330', '3340', '3364', '4638', '2055',
        '4641', '4643', '2138', '2139', '2140', '2422', '2419', '2421', '2423', '2424', '3042',
        '3112', '3363', '3400', '3599', '3600', '3513', '4403', '3177', '2403', '3040', '3184'
    ];
    
    // Store all ids in one array
    const initItemIds = () => {
        let tmp = [];
        for (let id in items.data) {
            if (!banIds.includes(id)) {
                tmp.push(id);
            }
        }
        return tmp;
    }

    const itemIds = useMemo(() => initItemIds(), []);

    // Filter ids by search value
    const textSearch = useCallback(() => {
        if (searchValue && searchValue.length > 0) {
            let tmpSearchIds = [];
            for (let id in items.data) {
                const name = items.data[id].name.toLowerCase();
                if (name?.includes(searchValue.toLowerCase())) {
                    tmpSearchIds.push(id);
                }
            }
            return tmpSearchIds;
        } else {
            return itemIds;
        }
    }, [searchValue, itemIds]);

    // Filter ids by tags value
    const tagSearch = useCallback(() => {
        if (tags && tags.length > 0) {
            let tmpTagsIds = [];
            for (let id in items.data) {
                const itemTags = items.data[id].tags;
                const commonTags = itemTags.filter(tag => tags.includes(tag) ? tag : null);
                if (tags.length === commonTags.length && tags.every(el => commonTags.includes(el))) {
                    tmpTagsIds.push(id);
                }
            }
            return tmpTagsIds;
        } else {
            return itemIds;
        }
    }, [tags, itemIds]);

    // Filter ids by tags and search value
    useEffect(() => {
        const tmpSearchIds = textSearch();
        const tmpTagsIds = tagSearch();
        setIds(tmpSearchIds.filter(id => tmpTagsIds.indexOf(id) > -1));
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
                <span className='item-page-title'>LoL Items</span>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                <div className='tags-container'>
                    {TAGNAMES.map((name, index) => <Tag key={index} label={name} onCheckboxChange={onTagChange}></Tag>)}
                </div>
            </div>
            <Grid itemIds={ids} type='item'/>
        </div>
    );
}

export default ItemPage;