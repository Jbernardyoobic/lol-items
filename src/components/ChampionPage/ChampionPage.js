import PageTemplate from '../PageTemplate/PageTemplate';

const ChampionPage = () => {
    
    const TAGNAMES = [
        'Tank', 'Fighter', 'Mage', 'Assassin', 'Support', 'Marksman'
    ];

    return (
        <PageTemplate tagNames={TAGNAMES} title='Champions' type='champion'></PageTemplate>
    );
};

export default ChampionPage;