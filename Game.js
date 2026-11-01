import { Player } from './Player.js';
import { Upgrade } from './Upgrade.js';
import { UIManager } from './UIManager.js';
import { SaveSystem } from './SaveSystem.js';
import { Citizen } from './Citizen.js';
import { Building } from './Building.js';

class Game {
    constructor() {
        console.log("Game constructor started");
        
        this.player = new Player();
        this.ui = new UIManager();
        this.upgrades = [
            new Upgrade('cursor', 'Auto-Clicker', 15, 1.15, 0.1, 'passive', 'money'),
            new Upgrade('sharp_clicks', 'Sharper Clicks', 50, 1.3, 1, 'click', 'money')
        ];
        this.citizens = [
            new Citizen('Woodcutter', 'money', 20, 1.15),
            new Citizen('Miner', 'money', 40, 1.15)
        ];
        this.buildings = [
            new Building('Logging Camp', 50, null, 1.15, 'wood', null, 'woodcutterCap'),
            new Building('Mining Camp', 100, 50, 1.15, 'wood', 'stone', 'minerCap')
        ];
        
        this.init();
    }

    init() {
        console.log("Game initialization started");
        // Set up the big button click event
        this.ui.clickButton.addEventListener('click', () => {
            this.player.addCurrency("money", this.player.clickPower);
            this.player.totalClicks++;
            this.ui.updateDisplay(this.player);
        });

        // Set up the reset button
        document.getElementById('resetButton').addEventListener('click', () => {
            this.resetSave();
        });

        // Try loading a save file
        SaveSystem.load(this.player, this.upgrades, this.citizens, this.buildings);
        
        this.ui.renderUpgradeShop(this.upgrades, (upgrade) => this.handleUpgradePurchase(upgrade));
        console.log("Upgrade shop rendered");

        this.ui.renderCitizenShop(this.citizens, (citizen) => this.handleCitizenPurchase(citizen));

        this.ui.renderBuildingShop(this.buildings, (building) => this.handleBuildingPurchase(building));

        // Start 30 FPS core update loop for passive income
        setInterval(() => this.updateLoop(), 1000 / 30);
        
        // Auto-save every 10 seconds
        setInterval(() => SaveSystem.save(this.player, this.upgrades, this.citizens, this.buildings), 10000);
    }

    handleUpgradePurchase(upgrade) {
        console.log("Upgrade button clicked:", upgrade.name);
        console.log("Current money:", this.player.money);
        console.log("Upgrade cost:", upgrade.currentCost);

        const success = upgrade.purchase(this.player);

        console.log("Purchase successful:", success);
        console.log("Upgrade level:", upgrade.level);
        console.log("Money remaining:", this.player.money);s
        
        if (success) {
            this.ui.renderUpgradeShop(
                this.upgrades,
                (u) => this.handleUpgradePurchase(u)
            );
            this.ui.updateDisplay(this.player);
        } else {
            this.failPurchase();
        }
    }

    handleCitizenPurchase(citizen) {
        if (citizen.purchase(this.player)) {
            this.ui.renderCitizenShop(this.citizens, (c) => this.handleCitizenPurchase(c));
            this.ui.updateDisplay(this.player);
        } else {
            this.failPurchase();
        }
    }
    
    handleBuildingPurchase(building) {
        if (building.purchase(this.player)) {
            this.ui.renderBuildingShop(this.buildings, (b) => this.handleBuildingPurchase(b));
            this.ui.updateDisplay(this.player);
        } else {
            this.failPurchase();
        }
    }

    updateLoop() {
        // Passive income divided across 30 ticks per second
        const ticksPerSecond = 30;
        this.player.addCurrency("money", (this.player.passiveIncome / ticksPerSecond));
        this.player.addCurrency("wood", (this.player.passiveWood / ticksPerSecond));
        this.player.addCurrency("stone", (this.player.passiveStone / ticksPerSecond));
        this.ui.updateDisplay(this.player);
    }

    resetSave() {
        SaveSystem.clearSave(this.player, this.upgrades, this.citizens, this.buildings);
        this.ui.renderUpgradeShop(this.upgrades, (upgrade) => this.handleUpgradePurchase(upgrade));
        this.ui.renderBuildingShop(this.buildings, (building) => this.handleBuildingPurchase(building));
        this.ui.renderCitizenShop(this.citizens, (citizen) => this.handleCitizenPurchase(citizen));
    }

    failPurchase() {
        const audio = new Audio('./error_01.wav');
        audio.currentTime = 0; 
        audio.play();
    }
}

// Fire up the game engine!
const gameEngine = new Game();
