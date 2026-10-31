export class Citizen {
  constructor(job, currency, baseCost, costMult, count) {
    this.job = job;
    this.currency = currency;
    this.baseCost = baseCost;
    this.costMult = costMult;
    this.count = count;
    this.level = 1;
    this.baseIncome = 0.2;
  }

  get currentCost() {
    return Math.floor(this.baseCost * Math.pow(this.costMult, this.count));
  }

  levelUp() {
    this.level++;
  }

  purchase(player) {
    const cost = this.currentCost;

    if (!player.isAtCitizenCap(this.currency) && player.spendCurrency(this.currency, cost)) {
      player.addCitizen(this.job, this.baseIncome);
      this.count++;
      return true;
    }

    return false;
  }
  
}
