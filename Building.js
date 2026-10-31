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

  get currentCost() {
    return Math.floor(this.baseCost * Math.pow(this.costMult, this.count));
  }

  purchase(player) {
    const cost = this.currentCost;

    if (player.spendCurrency(this.currency, cost)) {
      this.count++;
      return true;
    }

    return false;
  }
}
