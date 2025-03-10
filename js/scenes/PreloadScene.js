// Preload Scene - Handles asset loading and generation

class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Display loading text
        const loadingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 50,
            'Loading Magic...', 
            { 
                font: '24px Arial', 
                fill: '#6a1b9a',
                fontStyle: 'bold' 
            }
        );
        loadingText.setOrigin(0.5);
        
        // Create loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x6a1b9a, 0.3);
        progressBox.fillRoundedRect(240, 270, 320, 50, 10);
        
        // Loading progress events
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0x9c27b0, 1);
            progressBar.fillRoundedRect(250, 280, 300 * value, 30, 5);
        });
        
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
    }

    create() {
        // Create magical sparkle animation for the game
        this.createSparkleEffect();
        
        // Define character data for various wizards
        this.createCharacterData();
        
        // Simulate a small loading delay for effect
        this.time.delayedCall(800, () => {
            // Start with menu scene
            this.scene.start('MenuScene');
        });
    }
    
    createSparkleEffect() {
        // Create a sparkle particle effect to use throughout the game
        const particles = this.add.particles(0, 0, 'particle', {
            frame: 0,
            quantity: 10,
            scale: { start: 0.1, end: 0 },
            blendMode: 'ADD',
            lifespan: 800
        });
        
        // Store in the registry to use across scenes
        this.registry.set('sparkleEffect', particles);
    }
    
    createCharacterData() {
        // Wizard character data (for wizard)
        this.game.wizardData = {
            body: { 
                robe: [
                    {x: 0, y: 20}, {x: 40, y: 20},
                    {x: 45, y: 60}, {x: -5, y: 60}
                ],
                head: { x: 20, y: 10, radius: 15 },
                hat: [
                    {x: 0, y: 5}, {x: 40, y: 5},
                    {x: 20, y: -20}
                ]
            },
            features: {
                eyes: [{x: 15, y: 10}, {x: 25, y: 10}],
                beard: [
                    {x: 10, y: 15}, {x: 30, y: 15},
                    {x: 30, y: 30}, {x: 10, y: 30}
                ],
                staff: [
                    {x: 45, y: 20}, {x: 60, y: 10}
                ]
            }
        };
        
        // Owl character data
        this.game.owlData = {
            body: [
                {x: 10, y: 20}, {x: 30, y: 20}, {x: 35, y: 35},
                {x: 20, y: 45}, {x: 5, y: 35}
            ],
            head: [
                {x: 10, y: 15}, {x: 30, y: 15}, {x: 35, y: 5},
                {x: 20, y: 0}, {x: 5, y: 5}
            ],
            ears: [
                [{x: 12, y: 5}, {x: 8, y: -5}, {x: 5, y: 5}],
                [{x: 28, y: 5}, {x: 32, y: -5}, {x: 35, y: 5}]
            ],
            face: {
                eyes: [{x: 15, y: 10, radius: 4}, {x: 25, y: 10, radius: 4}],
                beak: [{x: 18, y: 15}, {x: 20, y: 18}, {x: 22, y: 15}]
            },
            glasses: [
                {x: 15, y: 10, radius: 6},
                {x: 25, y: 10, radius: 6},
                {x: 20, y: 10, width: 4, height: 1}
            ]
        };
        
        // Dragon character data
        this.game.dragonData = {
            body: [
                {x: 10, y: 25}, {x: 40, y: 25},
                {x: 50, y: 40}, {x: 0, y: 40}
            ],
            head: [
                {x: 40, y: 25}, {x: 60, y: 15},
                {x: 55, y: 30}, {x: 40, y: 30}
            ],
            tail: [
                {x: 10, y: 25}, {x: -10, y: 15},
                {x: -15, y: 25}, {x: 0, y: 30}
            ],
            wings: [
                [{x: 20, y: 25}, {x: 30, y: 10}, {x: 40, y: 25}]
            ],
            face: {
                eyes: [{x: 50, y: 20}, {x: 55, y: 20}],
                nostrils: [{x: 57, y: 25}, {x: 59, y: 25}]
            }
        };
        
        // Phoenix character data
        this.game.phoenixData = {
            body: [
                {x: 20, y: 30}, {x: 40, y: 20},
                {x: 50, y: 40}, {x: 10, y: 40}
            ],
            wings: [
                [{x: 15, y: 30}, {x: 0, y: 15}, {x: 15, y: 25}],
                [{x: 45, y: 20}, {x: 60, y: 5}, {x: 50, y: 25}]
            ],
            tail: [
                {x: 10, y: 40}, {x: 0, y: 50},
                {x: 5, y: 55}, {x: 15, y: 45}
            ],
            head: {
                shape: [{x: 45, y: 20}, {x: 55, y: 15}, {x: 50, y: 25}],
                eyes: [{x: 50, y: 18}],
                beak: [{x: 55, y: 15}, {x: 60, y: 18}, {x: 55, y: 20}]
            },
            flames: [
                [{x: 15, y: 25}, {x: 10, y: 15}, {x: 20, y: 20}],
                [{x: 50, y: 25}, {x: 55, y: 15}, {x: 45, y: 20}],
                [{x: 5, y: 55}, {x: 0, y: 60}, {x: 10, y: 57}]
            ]
        };
    }
}