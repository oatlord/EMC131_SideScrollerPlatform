let cursors;

class LoadingScreen extends Phaser.Scene {
    constructor() {
        super("LoadingScreen");
    }

    preload() {
        this.load.image("worldTileset","assets/sprites/tiles/world_tileset.png");

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