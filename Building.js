export class Building {
  constructor(name, baseCost1, baseCost2, costMult, currency1, currency2, type) {
    this.name = name;
    this.baseCost1 = baseCost1;
    this.baseCost2 = baseCost2;
    this.costMult = costMult;
    this.currency1 = currency1;
    this.currency2 = currency2;
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
    if (player[this.currency1] < cost1) {
      return false;
    }

    if (this.currency2 !== null && player[this.currency2] < cost2) {
      return false;
    }

    // Spend currencies
    player.spendCurrency(this.currency1, cost1);

    if (this.currency2 !== null) {
      player.spendCurrency(this.currency2, cost2);
    }

    this.count++;
    return true;
  }
}
