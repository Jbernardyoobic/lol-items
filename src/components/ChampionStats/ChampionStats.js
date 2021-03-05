import './ChampionStats.scss';

const ChampionStats = ({stats}) => {
    return (
        <div className='champion-stats'>
            <div className='stat'>
                <span>HP</span>
                <span>{stats.hp}</span>
            </div>
            <div className='stat'>
                <span>HP/niv</span>
                <span>{stats.hpperlevel}</span>
            </div>
            <div className='stat'>
                <span>RegenHP</span>
                <span>{stats.hpregen}</span>
            </div>
            <div className='stat'>
                <span>RegenHP/niv</span>
                <span>{stats.hpregenperlevel}</span>
            </div>
            <div className='stat'>
                <span>MP</span>
                <span>{stats.mp}</span>
            </div>
            <div className='stat'>
                <span>MP/niv</span>
                <span>{stats.mpperlevel}</span>
            </div>
            <div className='stat'>
                <span>RegenMP</span>
                <span>{stats.mpregen}</span>
            </div>
            <div className='stat'>
                <span>RegenMP/niv</span>
                <span>{stats.mpregenperlevel}</span>
            </div>
            <div className='stat'>
                <span>Atk</span>
                <span>{stats.attackdamage}</span>
            </div>
            <div className='stat'>
                <span>Atk/niv</span>
                <span>{stats.attackdamageperlevel}</span>
            </div>
            <div className='stat'>
                <span>AtkSpeed</span>
                <span>{stats.attackspeed}</span>
            </div>
            <div className='stat'>
                <span>AtkSpeed/niv</span>
                <span>{stats.attackspeedperlevel}</span>
            </div>
            <div className='stat'>
                <span>Range</span>
                <span>{stats.attackrange}</span>
            </div>
            <div className='stat'>
                <span>Armure</span>
                <span>{stats.armor}</span>
            </div>
            <div className='stat'>
                <span>Armure/niv</span>
                <span>{stats.armorperlevel}</span>
            </div>
            <div className='stat'>
                <span>MR</span>
                <span>{stats.spellblock}</span>
            </div>
            <div className='stat'>
                <span>MR/niv</span>
                <span>{stats.spellblockperlevel}</span>
            </div>
            <div className='stat'>
                <span>Vitesse</span>
                <span>{stats.movespeed}</span>
            </div>
        </div>
    );
}

export default ChampionStats;