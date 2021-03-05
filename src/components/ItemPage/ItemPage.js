import Grid from '../Grid/Grid';
import items from '../../data/item.json';
import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Tag from '../Tag/Tag';
import './ItemPage.css';

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
    
    // Store all ids in one array
    const initItemIds = () => {
        let tmp = [];
        for (let id in items) {
        tmp.push(id);
        }
        return tmp;
    }
    const itemIds = useMemo(() => initItemIds(), []);

    // Filter ids by search value
    const textSearch = useCallback(() => {
        if (searchValue && searchValue.length > 0) {
        let tmpSearchIds = [];
        for (let id in items) {
            const name = items[id].name.toLowerCase();
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
        for (let id in items) {
            const itemTags = items[id].tags;
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
            <Grid itemIds={ids} type='items'/>
        </div>
    );
}

export default ItemPage;