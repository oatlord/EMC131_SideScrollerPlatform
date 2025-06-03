const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 700},
            debug: true
        }
    },
    scene: [LoadingScreen, Level1, Level2, Level3]
};

const game = new Phaser.Game(config);