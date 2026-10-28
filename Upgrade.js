export class Upgrade {
    constructor(id, name, baseCost, costMultiplier, incomeGenerated, type = 'passive') {
        this.id = id;
        this.name = name;
        this.baseCost = baseCost;
        this.costMultiplier = costMultiplier; // e.g., 1.15
        this.incomeGenerated = incomeGenerated; // Gained per level
        this.type = type; // 'click' or 'passive'
        this.level = 0;
    }

    get currentCost() {
        return Math.floor(this.baseCost * Math.pow(this.costMultiplier, this.level));
    }

    purchase(player) {
        const cost = this.currentCost;
        if (player.spendCurrency(cost)) {
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
