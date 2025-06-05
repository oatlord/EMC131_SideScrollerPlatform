let cursors;
let jumpHeight = -190;

class LoadingScreen extends Phaser.Scene {
    constructor() {
        super("LoadingScreen");
    }

    preload() {
        this.load.spritesheet("worldTileset","assets/sprites/tiles/worldTileset.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("coinSprite", "assets/sprites/collectibles/coin.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('fruitSprite', 'assets/sprites/collectibles/fruit.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player","assets/sprites/player/hoodedGuy.png",
            {frameWidth: 32, frameHeight: 32}
        );
        
        this.load.tilemapTiledJSON("level1","assets/tilemaps/Level1.tmj");
        this.load.tilemapTiledJSON("level2","assets/tilemaps/Level2.tmj");
        this.load.tilemapTiledJSON("level3","assets/tilemaps/Level3.tmj");
        
        this.load.on('complete', () => {
            console.log("Asset loading finished.");
            this.scene.start("Level1");
        })
    }

    create() {
        
    }
} 

function collectCoin(player, coin) {
    coin.disableBody(true, true);
    console.log("Coined");
}

function switchScene(player, finish) {
    let interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    if (interactKey.isDown) {
        this.scene.start("Level2");
    }
}

function collectFruit(player, fruit) {
    fruit.disableBody(true, true);
    jumpHeight = -280;
}