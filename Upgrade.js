export class Upgrade {
    constructor(id, name, baseCost, costMult, incomeGenerated, type = 'passive', currency) {
        this.id = id;
        this.name = name;
        this.baseCost = baseCost;
        this.costMult = costMult; // e.g., 1.15
        this.incomeGenerated = incomeGenerated; // Gained per level
        this.type = type; // 'click' or 'passive'
        this.currency = currency;
        this.level = 0;
    }

    get currentCost() {
        return Math.floor(this.baseCost * Math.pow(this.costMult, this.level));
    }

    purchase(player) {
        const cost = this.currentCost;
        if (player.spendCurrency(currency, cost)) {
            this.level++;
            if (this.type === 'click') {
                player.clickPower += this.incomeGenerated;
            } else {
                player.passiveIncome += this.incomeGenerated;
            }
            return true;
        }
        return false;
    }
}
