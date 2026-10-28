export class Player {
    constructor() {
        this.money = 0;
        this.wood = 0;
        this.stone = 0;
        this.totalClicks = 0;
        this.clickPower = 1;
        this.passiveIncome = 0;
    }

    addCurrency(currency, amount) {
        if (currency === "money") {
            this.addMoney(amount);
        } else if (currency === "wood") {
            this.addWood(amount);
        } else if (currency === "stone") {
            this.addStone(amount);
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

    spendCurrency(currency, amount) {
        if (currency === "money") {
            spendMoney(amount);
        } else if (currency === "wood") {
            spendWood(amount);
        } else if (currency === "stone") {
            spendStone(amount);
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
}
