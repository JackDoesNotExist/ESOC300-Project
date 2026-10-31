export class Building {
  constructor(building, baseCost1, baseCost2, costMult, currency1, currency2, count) {
    this.building;
    this.baseCost1;
    this.baseCost2;
    this.costMult;
    this.currency1;
    this.currency2;
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

    // Check if player can afford and spend the currencies if possible.
    if (!player.spendCurrency(this.currency1, cost1)) {
      return false;
    }

    if (this.currency2 !== null) {
      if (!player.spendCurrency(this.currency2, cost2)) {
        return false;
      }
    }

    this.count++;
    return true;
  }
}
