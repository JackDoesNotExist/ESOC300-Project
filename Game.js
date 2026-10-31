import { Player } from './Player.js';
import { Upgrade } from './Upgrade.js';
import { UIManager } from './UIManager.js';
import { SaveSystem } from './SaveSystem.js';
import { Citizen } from './Citizen.js';

class Game {
    constructor() {
        this.player = new Player();
        this.ui = new UIManager();
        this.upgrades = [
            new Upgrade('cursor', 'Auto-Clicker', 15, 1.15, 0.1, 'passive'),
            new Upgrade('grandma', 'Grandma', 100, 1.15, 1, 'passive'),
            new Upgrade('sharp_clicks', 'Sharper Clicks', 50, 1.3, 1, 'click')
        ];
        this.citizens = [
            new Citizen('Woodcutter', 'money', 10, 1.15, 0),
            new Citizen('Miner', 'money', 20, 1.15, 0)
        ];
        
        this.init();
    }

    init() {
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
        SaveSystem.load(this.player, this.upgrades, this.citizens);
        
        this.ui.renderShop(this.upgrades, (upgrade) => this.handlePurchase(upgrade));

        this.ui.renderCitizenShop(this.citizens, (citizen) => this.handleCitizenPurchase(citizen));

        // Start 30 FPS core update loop for passive income
        setInterval(() => this.updateLoop(), 1000 / 30);
        
        // Auto-save every 10 seconds
        setInterval(() => SaveSystem.save(this.player, this.upgrades, this.citizens), 10000);
    }

    handlePurchase(upgrade, this.ui) {
        if (upgrade.purchase(this.player, this.ui)) {
            this.ui.renderShop(this.upgrades, (u) => this.handlePurchase(u));
            this.ui.updateDisplay(this.player);
        }
    }

    handleCitizenPurchase(citizen, this.ui) {
        if (citizen.purchase(this.player, this.ui)) {
            this.ui.renderCitizenShop(
                this.citizens,
                (c) => this.handleCitizenPurchase(c)
            );

            this.ui.updateDisplay(this.player);
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
        SaveSystem.clearSave(this.player, this.upgrades, this.citizens);
        this.ui.renderShop(this.upgrades, (upgrade) => this.handlePurchase(upgrade));
        this.ui.renderCitizenShop(this.citizens, (citizen) => this.handleCitizenPurchase(citizen));
    }
}

// Fire up the game engine!
const gameEngine = new Game();
