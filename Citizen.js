class Citizen {
  constructor(job, currency, baseCost, costMult) {
    this.job = job;
    this.currency = currency;
    this.baseCost = baseCost;
    this.costMult = costMult;
  }

  get currentCost() {
    return Math.floor(this.baseCost * Math.pow(this.costMult, this.level));
  }

  purchase(player) {
    const cost = this.currenctCost;
  }
}
