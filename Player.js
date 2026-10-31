export class Player {
    constructor() {
        this.reset();
    }

    // Determines currency types and calls related add function
    addCurrency(currency, amount) {
        if (currency === "money") {
            return this.addMoney(amount);
        } else if (currency === "wood") {
            return this.addWood(amount);
        } else if (currency === "stone") {
            return this.addStone(amount);
        }
    }

    addMoney(amount) {
        this.money += amount;
    }
    
    addWood(amount) {
        this.wood += amount;
    }
    
    addStone(amount) {
        this.stone += amount;
    }

    // Determines currency types and calls related spend function
    spendCurrency(currency, amount) {
        if (currency === "money") {
            return this.spendMoney(amount);
        } else if (currency === "wood") {
            return this.spendWood(amount);
        } else if (currency === "stone") {
            return this.spendStone(amount);
        }
    }

    spendMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            return true;
        }
        return false;
    }

    spendWood(amount) {
        if (this.wood >= amount) {
            this.wood -= amount;
            return true;
        }
        return false;
    }

    spendStone(amount) {
        if (this.stone >= amount) {
            this.stone -= amount;
            return true;
        }
        return false;
    }

    addCitizen(job, incomeGenerated) {
        if (job === "Woodcutter") {
            this.woodcutters += 1;
            this.passiveWood += incomeGenerated;
        } else if (job === "Miner") {
            this.miners += 1;
            this.passiveStone += incomeGenerated;
        }
        this.citizens += 1;
    }

    get citizenCap() {
        return this.woodcutterCap + this.minerCap;
    }
    
    reset() {
        this.money = 0;
        this.wood = 0;
        this.stone = 0;
        
        this.citizens = 0;
        this.woodcutters = 0;
        this.miners = 0;
        this.woocutterCap = 5;
        this.minerCap = 5;
        
        this.totalClicks = 0;
        this.clickPower = 1;
        
        this.passiveIncome = 0;
        this.passiveWood = 0;
        this.passiveStone = 0;
    }
}
