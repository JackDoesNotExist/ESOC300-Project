export class Citizen {
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

  levelUp() {
    this.level++;
  }

  purchase(player) {
    const cost = this.currentCost;

    console.log("Attempting purchase:", this.job);
    console.log("Cost:", cost);
    console.log("Player money:", player.money);
    
    if (player.spendCurrency(this.currency, cost)) {
      console.log("Purchase successful!");
      
      player.addCitizen(this.job);

      console.log("Citizens:", player.citizens);
      console.log("Woodcutters:", player.woodcutters);
      console.log("Miners:", player.miners);
      
      this.count++;
      return true;
    }

    console.log("Not enough currency!");
    return false;
  }
  
}
