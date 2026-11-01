import { Player } from './Player.js';
import { Upgrade } from './Upgrade.js';
import { UIManager } from './UIManager.js';
import { SaveSystem } from './SaveSystem.js';
import { Citizen } from './Citizen.js';
import { Building } from './Building.js';

class Game {
    constructor() {
        this.player = new Player();
        this.ui = new UIManager();
        this.citizens = [
            new Citizen('Woodcutter', 'money', 20, 1.15, 0.2),
            new Citizen('Miner', 'money', 40, 1.15, 0.2),
            new Citizen('Hunter', 'money', 60, 1.15, 0.3)
        ];
        this.buildings = [
            new Building('Logging Camp', 50, null, 1.15, 'wood', null, 'woodcutterCap'),
            new Building('Mining Camp', 100, 50, 1.15, 'wood', 'stone', 'minerCap'),
            new Building('Hunting Lodge', 150, null, 1.15, 'wood', null, 'hunterCap')
        ];
        this.upgrades = [
            new Upgrade('taxes', 'Taxes', 15, 1.15, 0.1, 'passive', 'money'),
            new Upgrade('better-hammers', 'Better Hammers', 50, 1.3, 1, 'click', 'money'),
            new Upgrade('quality-rifles', 'Quality Rifles', 75, 1.3, 2, 'passive', 'food', this.citizens[2])
        ];
        
        this.init();
    }

    init() {
        // Set up the big button click event
        this.ui.clickButton.addEventListener('click', () => {
            this.player.addResource("money", this.player.clickPower);
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

        this.ui.renderCitizenShop(this.citizens, (citizen) => this.handleCitizenPurchase(citizen));

        this.ui.renderBuildingShop(this.buildings, (building) => this.handleBuildingPurchase(building));

        // Start 30 FPS core update loop for passive income
        setInterval(() => this.updateLoop(), 1000 / 30);
        
        // Auto-save every 10 seconds
        setInterval(() => SaveSystem.save(this.player, this.upgrades, this.citizens, this.buildings), 10000);
    }

    handleUpgradePurchase(upgrade) {
        
        if (upgrade.purchase(this.player)) {
            this.ui.renderUpgradeShop(this.upgrades, (u) => this.handleUpgradePurchase(u));
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
        this.player.addResource("money", (this.player.passiveIncome / ticksPerSecond));
        this.player.addResource("wood", (this.player.passiveWood / ticksPerSecond));
        this.player.addResource("stone", (this.player.passiveStone / ticksPerSecond));
        this.player.addResource("food", (this.player.totalPassiveFood / ticksPerSecond));
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
