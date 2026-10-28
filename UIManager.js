export class UIManager {
    constructor() {
        this.moneyText = document.getElementById('money-display');
        this.woodText = document.getElementById('wood-display');
        this.stoneText = document.getElementById('stone-display');
        this.cpsText = document.getElementById('cps-display');
        this.clickButton = document.getElementById('main-button');
        this.shopContainer = document.getElementById('shop-container');

        this.shopContainer.style.position = "fixed";
        this.shopContainer.style.bottom = "80px";
    }

    updateDisplay(player) {
        this.moneyText.innerText = Math.floor(player.money).toLocaleString();
        this.woodText.innerText = Math.floor(player.wood).toLocaleString();
        this.stoneText.innerText = Math.floor(player.stone).toLocaleString();
        this.cpsText.innerText = player.passiveIncome.toFixed(1);
    }

    renderShop(upgrades, onPurchaseCallback) {
        this.shopContainer.innerHTML = ''; // Clear prior shop UI
        upgrades.forEach(upgrade => {
            const btn = document.createElement('button');
            btn.className = 'shop-btn';
            btn.innerHTML = `${upgrade.name} (Lvl ${upgrade.level}) <br> Cost: ${upgrade.currentCost}`;
            btn.onclick = () => onPurchaseCallback(upgrade);
            this.shopContainer.appendChild(btn);
        });
    }
}
