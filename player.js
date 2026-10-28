export class Player {
    Player() {
        this.money = 0;
        this.totalClicks = 0;
        this.clickPower = 1;
        this.passiveIncome = 0;
    }

    addMoney(amount) {
        this.money += amount;
    }

    spendMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            return true;
        }
        return false;
    }
}
