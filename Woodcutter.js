class Woodcutter extends Citizen {
  constructor(job, currency, baseCost, costMult, count) {
    super(job, currency, baseCost, costMult, count);
    
    this.level = 1;
  }

  levelUp() {
    this.level++;
  }
  
}
