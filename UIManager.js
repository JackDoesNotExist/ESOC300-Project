export class UIManager {
    constructor() {
        this.moneyText = document.getElementById('money-display');
        this.woodText = document.getElementById('wood-display');
        this.stoneText = document.getElementById('stone-display');
        
        this.citizenText = document.getElementById('citizen-display');
        this.woodcutterText = document.getElementById('woodcutter-display');
        this.minerText = document.getElementById('miner-display');

        this.totalCPS = 0.0;
        this.cpsText = document.getElementById('cps-display');
        this.clickButton = document.getElementById('main-button');
        
        this.shopContainer = document.getElementById('shop-container');
        this.citizenContainer = document.getElementById('citizen-container');
    }

    updateDisplay(player) {
        this.moneyText.innerText = Math.floor(player.money).toLocaleString();
        this.woodText.innerText = Math.floor(player.wood).toLocaleString();
        this.stoneText.innerText = Math.floor(player.stone).toLocaleString();
        this.citizenText.innerText = Math.floor(player.citizens).toLocaleString();
        this.woodcutterText.innerText = Math.floor(player.woodcutters).toLocaleString();
        this.minerText.innerText = Math.floor(player.miners).toLocaleString();

        this.totalCPS += player.passiveIncome + player.passiveWood + player.passiveStone;
        this.cpsText.innerText = player.totalCPS.toFixed(1);
    }

    renderShop(upgrades, onPurchaseCallback) {
        this.shopContainer.innerHTML = ''; // Clear prior shop UI
        
        upgrades.forEach(upgrade => {
            const btn = document.createElement('button');
            
            btn.className = 'shop-btn';
            btn.innerHTML = `
                ${upgrade.name} (Lvl ${upgrade.level})
                <br> 
                Cost: ${upgrade.currentCost}
            `;
            
            btn.onclick = () => onPurchaseCallback(upgrade);
            
            this.shopContainer.appendChild(btn);
        });
    }

    renderCitizenShop(citizens, onPurchaseCallback) {
        this.citizenContainer.innerHTML = '';

        citizens.forEach(citizen => {
            const btn = document.createElement('button');

            btn.className = 'shop-btn';
            btn.innerHTML = `
                ${citizen.job} (Owned: ${citizen.count})
                <br>
                Cost: ${citizen.currentCost}
            `;

            btn.onclick = () => onPurchaseCallback(citizen);

            this.citizenContainer.appendChild(btn);
        });
    }
}
