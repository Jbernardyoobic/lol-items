const ItemCostPage = () => {

    let gold = 0;
    const percentage = 1;

    const secToMin = (time) => {
      return `${Math.floor(time / 60)}:${time % 60}`;
    }

    const getSec = (time) => {
      return time % 60;
    }

    const getCreep = (value, size) => {
      for (let i = 0; i < size; i++) {
        let r = Math.random();
        if (r <= percentage) {
          gold += value;
        }
      }
    }

    const isCannonHere = (wave, time) => {
      if (time <= 900) {
        return wave % 3 === 0;
      } else if (time <= 1500) {
        return wave % 2 === 0;
      } else {
        return true;
      }
    }

    const test = () => {
      let time = 0;
      let wave = 0;
      let upgradeIndex = 0;
      const upgrades = [125, 215, 305, 395, 485, 575, 665, 755, 845, 935, 1025];
      const casterGold = 14;
      const meleeGold = 21;
      let cannonGold = 57;
      const passiveGold = 20.4;

      for (; time <= 3600; time++) {
        if (time % 10 === 0 && time > 110) {
          gold += passiveGold;
          console.log(secToMin(time), gold);
        }
        if (getSec(time) === 5 || getSec(time) === 35) {
          wave++;
          getCreep(casterGold, 3);
          getCreep(meleeGold, 3);
          if (isCannonHere(wave, time)) {
            if (upgradeIndex < upgrades.length && time >= upgrades[upgradeIndex]) {
              cannonGold += 3;
              console.log(secToMin(time), cannonGold);
              upgradeIndex++;
            }
            getCreep(cannonGold, 1);
          }
        }
      }
    }

    test();

    return (
      <div className='item-cost-page'>

      </div>  
    );
}

export default ItemCostPage;