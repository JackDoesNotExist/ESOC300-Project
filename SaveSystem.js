export class SaveSystem {
    static save(player, upgrades, citizens) {
        const saveData = {
            player: player,
            upgrades: upgrades.map(u => ({ id: u.id, level: u.level })),
            citizens: citizens.map(c => ({ job: c.job, count: c.count}))
        };
        localStorage.setItem('myClickerSave', JSON.stringify(saveData));
    }

    static load(player, upgrades, citizens) {
        const data = localStorage.getItem('myClickerSave');
        if (!data) return false;
        
        const parsed = JSON.parse(data);
        Object.assign(player, parsed.player);
        
        parsed.upgrades.forEach(savedUpgrade => {
            const actualUpgrade = upgrades.find(u => u.id === savedUpgrade.id);
            if (actualUpgrade) actualUpgrade.level = savedUpgrade.level;
        });

        parsed.citizens.forEach(savedCitizen => {
            const actualCitizen = citizens.find(c => c.job === savedCitizen.job);
            if (actualCitizen) actualCitizen.count = savedCitizen.count;
        });
        return true;
    }

    static clearSave(player, upgrades, citizens) {
        localStorage.removeItem('myClickerSave');

        player.reset();

        upgrades.forEach(upgrade => {
            upgrade.level = 0;
        });

        citizens.forEach(citizen => {
            citizen.count = 0;
        });

        return true;
    }
}
