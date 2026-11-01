export class Player {
    constructor() {
        this.reset();
    }

    get citizenCap() {
        return this.woodcutterCap + this.minerCap + this.hunterCap;
    }

    get totalPassiveFood() {
        return this.passiveFood + (this.workers['citizens'] * -0.1);
    }

    // Determines resource types and calls related add function
    addResource(resource, amount) {
        if (resource === "money") {
            return this.addMoney(amount);
        } else if (resource === "wood") {
            return this.addWood(amount);
        } else if (resource === "stone") {
            return this.addStone(amount);
        } else if (resource === "food") {
            return this.addFood(amount);
        }
    }

    addMoney(amount) {
        this.resources['money'] += amount;
    }
    
    addWood(amount) {
        this.resources['wood'] += amount;
    }
    
    addStone(amount) {
        this.resources['stone'] += amount;
    }

    addFood(amount) {
        this.resources['food'] += amount;
    }

    // Determines resource types and calls related spend function
    spendResource(resource, amount) {
        if (resource === "money") {
            return this.spendMoney(amount);
        } else if (resource === "wood") {
            return this.spendWood(amount);
        } else if (resource === "stone") {
            return this.spendStone(amount);
        } else if (resource === "food") {
            return this.spendFood(amount);
        }
    }

    spendMoney(amount) {
        if (this.resources['money'] >= amount) {
            this.resources['money'] -= amount;
            return true;
        }
        return false;
    }

    spendWood(amount) {
        if (this.resources['wood'] >= amount) {
            this.resources['wood'] -= amount;
            return true;
        }
        return false;
    }

    spendStone(amount) {
        if (this.resources['stone'] >= amount) {
            this.resources['stone'] -= amount;
            return true;
        }
        return false;
    }

    spendFood(amount) {
        if (this.resources['food'] >= amount) {
            this.resources['food'] -= amount;
            return true;
        }
        return false;
    }

    isAtCitizenCap(job) {
        if (job === "Woodcutter") {
            return this.workers['woodcutters'] >= this.woodcutterCap;
        } else if (job === "Miner") {
            return this.workers['miners'] >= this.minerCap;
        } else if (job === "Hunter") {
            return this.workers['hunters'] >= this.hunterCap;
        }
    }

    addCitizen(job, incomeGenerated) {
        if (job === "Woodcutter") {
            this.workers['woodcutters'] += 1;
            this.passiveWood += incomeGenerated;
        } else if (job === "Miner") {
            this.workers['miners'] += 1;
            this.passiveStone += incomeGenerated;
        } else if (job === "Hunter") {
            this.workers['hunters'] += 1;
            this.passiveFood += 1;
            
        }
        this.workers['citizens'] += 1;
    }
    
    reset() {
        this.resources = {money: 0, wood: 0, stone: 0, food: 50};
        this.workers = {citizens: 0, woodcutters: 0, miners: 0, hunters: 0};

        this.woodcutterCap = 5;
        this.minerCap = 5;
        this.hunterCap = 5;
        
        this.totalClicks = 0;
        this.clickPower = 1;
        
        this.passiveIncome = 0;
        this.passiveWood = 0;
        this.passiveStone = 0;
        this.passiveFood = 0;
    }
}
