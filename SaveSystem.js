export class SaveSystem {
    static save(player, upgrades) {
        const saveData = {
            player: player,
            upgrades: upgrades.map(u => ({ id: u.id, level: u.level }))
        };
        localStorage.setItem('myClickerSave', JSON.stringify(saveData));
    }

    static load(player, upgrades) {
        const data = localStorage.getItem('myClickerSave');
        if (!data) return false;
        
        const parsed = JSON.parse(data);
        Object.assign(player, parsed.player);
        
        parsed.upgrades.forEach(savedUpgrade => {
            const actualUpgrade = upgrades.find(u => u.id === savedUpgrade.id);
            if (actualUpgrade) actualUpgrade.level = savedUpgrade.level;
        });
        return true;
    }
}
