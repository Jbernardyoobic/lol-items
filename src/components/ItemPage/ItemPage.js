import PageTemplate from '../PageTemplate/PageTemplate';

const ItemPage = () => {
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
    
    return (
        <PageTemplate tagNames={TAGNAMES} title='Items' type='item' banIds={banIds}></PageTemplate>
    );
}

export default ItemPage;