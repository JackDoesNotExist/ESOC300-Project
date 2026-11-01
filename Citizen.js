export class Citizen {
  constructor(job, resource, baseCost, costMult) {
    this.job = job;
    this.resource = resource;
    this.baseCost = baseCost;
    this.costMult = costMult;
    this.count = 0;
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

    if (!player.isAtCitizenCap(this.job) && player.spendResource(this.resource, cost)) {
      player.addCitizen(this.job, this.baseIncome);
      this.count++;
      return true;
    }

    return false;
  }
  
}
