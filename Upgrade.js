export class Upgrade {
    constructor(id, name, baseCost, costMult, incomeGenerated, type = 'passive', resource) {
        this.id = id;
        this.name = name;
        this.baseCost = baseCost;
        this.costMult = costMult; // e.g., 1.15
        this.incomeGenerated = incomeGenerated; // Gained per level
        this.type = type; // 'click' or 'passive'
        this.resource = resource;
        this.level = 0;
    }

    get currentCost() {
        return Math.floor(this.baseCost * Math.pow(this.costMult, this.level));
    }

    purchase(player) {
        const cost = this.currentCost;

        console.log('Money: ', player.resources['money']);
        if (player.spendResource(player.resources['money'], cost)) {
            console.log('Purchase successful!');
            this.level++;
            if (this.type === 'click') {
                player.clickPower += this.incomeGenerated;
            } else {
                console.log(this.type);
                if (this.resource === 'money') {
                    player.passiveIncome += this.incomeGenerated;
                } else if (this.resource === 'wood') {
                    player.passiveWood += this.incomeGenerated;
                } else if (this.resource === 'stone') {
                    player.passiveStone += this.incomeGenerated;
                } else if (this.resource === 'food') {
                    player.passiveFood += this.incomeGenerated;
                }
            }
            return true;
        }
        return false;
    }
}
