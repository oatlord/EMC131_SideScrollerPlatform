const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            debug: true
        }
    },
    pixelArt: true,
    scene: [LoadingScreen, Level1, Level2, Level3]
    // scene: [LoadingScreen, Level2, Level3]
};

const game = new Phaser.Game(config);