export class UIManager {
    UIManager() {
        this.currencyText = document.getElementById('currency-display');
        this.cpsText = document.getElementById('cps-display');
        this.clickButton = document.getElementById('main-clicker');
        this.shopContainer = document.getElementById('shop-container');
    }

    updateDisplay(player) {
        this.currencyText.innerText = Math.floor(player.currency).toLocaleString();
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
