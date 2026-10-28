import { Player } from './Player.js';
import { Upgrade } from './Upgrade.js';
import { UIManager } from './UIManager.js';
import { SaveSystem } from './SaveSystem.js';

class Game {
    constructor() {
        this.player = new Player();
        this.ui = new UIManager();
        this.upgrades = [
            new Upgrade('cursor', 'Auto-Clicker', 15, 1.15, 0.1, 'passive'),
            new Upgrade('grandma', 'Grandma', 100, 1.15, 1, 'passive'),
            new Upgrade('sharp_clicks', 'Sharper Clicks', 50, 1.3, 1, 'click')
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

        // Try loading a save file
        SaveSystem.load(this.player, this.upgrades);

        // First UI Render
        this.ui.renderShop(this.upgrades, (upgrade) => this.handlePurchase(upgrade));

        // Start 30 FPS core update loop for passive income
        setInterval(() => this.updateLoop(), 1000 / 30);
        
        // Auto-save every 10 seconds
        setInterval(() => SaveSystem.save(this.player, this.upgrades), 10000);
    }

    handlePurchase(upgrade) {
        if (upgrade.purchase(this.player)) {
            this.ui.renderShop(this.upgrades, (u) => this.handlePurchase(u));
            this.ui.updateDisplay(this.player);
        }
    }

    updateLoop() {
        // Passive income divided across 30 ticks per second
        const ticksPerSecond = 30;
        this.player.addCurrency("money", (this.player.passiveIncome / ticksPerSecond));
        this.ui.updateDisplay(this.player);
    }

    resetSave() {
        SaveSystem.clearSave(this.player, this.upgrades);
    }
}

// Fire up the game engine!
const gameEngine = new Game();
