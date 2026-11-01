export class Building {
    constructor(name, baseCost1, baseCost2, costMult, resource1, resource2, type) {
        this.name = name;
        this.baseCost1 = baseCost1;
        this.baseCost2 = baseCost2;
        this.costMult = costMult;
        this.resource1 = resource1;
        this.resource2 = resource2;
        this.type = type;
        this.count = 0;
    }

    get currentCost1() {
        return Math.floor(this.baseCost1 * Math.pow(this.costMult, this.count));
    }

    get currentCost2() {
        if (this.baseCost2 === null) {
            return null;
        }
    
        return Math.floor(this.baseCost2 * Math.pow(this.costMult, this.count));
    }

    purchase(player) {
        const cost1 = this.currentCost1;
        const cost2 = this.currentCost2;
    
        // Check affordability
        if (player.resources[this.resource1] < cost1) {
          return false;
        }
    
        if (this.resource2 !== null && player.resources[this.resource2] < cost2) {
          return false;
        }
    
        // Spend currencies
        player.spendResource(this.resource1, cost1);
    
        if (this.resource2 !== null) {
          player.spendResource(this.resource2, cost2);
        }
    
        if (this.type === 'woodcutterCap') {
          player.woodcutterCap += 5;
        } else if (this.type === 'minerCap') {
          player.minerCap += 5;
        } else if (this.type === 'hunterCap') {
          player.hunterCap += 5;
        }
    
        this.count++;
        return true;
    }
}
