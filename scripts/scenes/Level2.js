class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
    }

    preload() {
    }

    create() {
        const map = this.make.tilemap({key: "level1", tileWidth: 32, tileHeight: 32});
        const tileset = map.addTilesetImage("worldTileset","worldTileset");
        const groundPlatforms = map.createDynamicLayer("Ground Platforms", tileset, 0,0);
        const bgDetails = map.createDynamicLayer("Background Details", tileset, 0,0);
        const bridgePlatform = map.createDynamicLayer("Bridge", tileset, 0,0);
    }
}