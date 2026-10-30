class Citizen {
  constructor(job, currency, baseCost, costMult, count) {
    this.job = job;
    this.currency = currency;
    this.baseCost = baseCost;
    this.costMult = costMult;
    this.count = count;
    this.level = 1;
  }

  get currentCost() {
    return Math.floor(this.baseCost * Math.pow(this.costMult, this.count));
  }

  purchase(player) {
    const cost = this.currenctCost;
    if (player.spendCurrency(currency, cost)) {
      this.count += 1;
      return true;
    }
    return false;
  }
}
