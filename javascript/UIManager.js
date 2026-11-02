export class UIManager {
    constructor() {
        this.moneyText = document.getElementById('money-display');
        this.woodText = document.getElementById('wood-display');
        this.stoneText = document.getElementById('stone-display');
        this.foodText = document.getElementById('food-display');
        
        this.citizenText = document.getElementById('citizen-display');
        this.woodcutterText = document.getElementById('woodcutter-display');
        this.minerText = document.getElementById('miner-display');
        this.hunterText = document.getElementById('hunter-display');

        this.hunterQuestText = document.getElementById('hunter-quest-display');
        this.woodcutterQuestText = document.getElementById('woodcutter-quest-display');
        this.loggingQuestText = document.getElementById('logging-quest-display');
        this.minerQuestText = document.getElementById('miner-quest-display');
        this.miningQuestText = document.getElementById('mining-quest-display');
        
        this.citizenCapText = document.getElementById('citizen-cap-display');
        this.woodcutterCapText = document.getElementById('woodcutter-cap-display');
        this.minerCapText = document.getElementById('miner-cap-display');
        this.hunterCapText = document.getElementById('hunter-cap-display');

        this.moneyCPS = document.getElementById('money-cps-display');
        this.woodCPS = document.getElementById('wood-cps-display');
        this.stoneCPS = document.getElementById('stone-cps-display');
        this.foodCPS = document.getElementById('food-cps-display');
        this.clickButton = document.getElementById('main-button');
        
        this.shopContainer = document.getElementById('shop-container');
        this.citizenContainer = document.getElementById('citizen-container');
        this.buildingContainer = document.getElementById('building-container');
    }

    updateDisplay(player, buildings) {
        this.moneyText.innerText = Math.floor(player.resources['money']).toLocaleString();
        this.woodText.innerText = Math.floor(player.resources['wood']).toLocaleString();
        this.stoneText.innerText = Math.floor(player.resources['stone']).toLocaleString();
        this.foodText.innerText = Math.floor(player.resources['food']).toLocaleString();
        
        this.citizenText.innerText = Math.floor(player.workers['citizens']).toLocaleString();
        this.woodcutterText.innerText = Math.floor(player.workers['woodcutters']).toLocaleString();
        this.minerText.innerText = Math.floor(player.workers['miners']).toLocaleString();
        this.hunterText.innerText = Math.floor(player.workers['hunters']).toLocaleString();

        if (this.hunterQuestText != null) {
            this.hunterQuestText.innerText = Math.floor(player.workers['hunters']).toLocaleString();
        }

        if (this.woodcutterQuestText != null) {
            this.woodcutterQuestText.innerText = Math.floor(player.workers['woodcutters']).toLocaleString();
            this.loggingQuestText.innerText = Math.floor(buildings[0].count).toLocaleString();
        }

        if (this.minerQuestText != null) {
            this.minerQuestText.innerText = Math.floor(player.workers['miners']).toLocaleString();
            this.miningQuestText.innerText = Math.floor(buildings[1].count).toLocaleString();
        }
        
        this.citizenCapText.innerText = Math.floor(player.citizenCap).toLocaleString();
        this.woodcutterCapText.innerText = Math.floor(player.woodcutterCap).toLocaleString();
        this.minerCapText.innerText = Math.floor(player.minerCap).toLocaleString();
        this.hunterCapText.innerText = Math.floor(player.hunterCap).toLocaleString();

        this.moneyCPS.innerText = player.passiveIncome.toFixed(1);
        this.woodCPS.innerText = player.passiveWood.toFixed(1);
        this.stoneCPS.innerText = player.passiveStone.toFixed(1);
        this.foodCPS.innerText = player.totalPassiveFood.toFixed(1);
    }

    renderUpgradeShop(upgrades, onPurchaseCallback) {
        this.shopContainer.innerHTML = ''; // Clear prior shop UI
        
        upgrades.forEach(upgrade => {
            const btn = document.createElement('button');
            
            btn.className = 'shop-btn';
            btn.innerHTML = `
                ${upgrade.name} (Lvl ${upgrade.level})
                <br> 
                Cost: ${upgrade.currentCost}
            `;
            
            btn.onclick = () => {
                onPurchaseCallback(upgrade)
            };
            
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

    renderBuildingShop(buildings, onPurchaseCallback) {
        this.buildingContainer.innerHTML = '';

        buildings.forEach(building => {
            const btn = document.createElement('button');

            btn.className = 'shop-btn';

            if (building.resource2 === null) {
                btn.innerHTML = `
                    ${building.name} (Owned: ${building.count})
                    <br>
                    Cost: ${building.currentCost1} ${building.resource1}
                `;
            } else {
                btn.innerHTML = `
                    ${building.name} (Owned: ${building.count})
                    <br>
                    Cost: ${building.currentCost1} ${building.resource1}
                    <br>
                    Cost: ${building.currentCost2} ${building.resource2}
                `;
            }

            btn.onclick = () => onPurchaseCallback(building);

            this.buildingContainer.appendChild(btn);
        });
    }

    playErrorSound(buttonID) {
        const button = document.getElementById(buttonID);
  
        const audio = new Audio('./error_01.wav');
      
        button.addEventListener('click', () => {
        audio.currentTime = 0; 
        audio.play();
      });
    }
}
