class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    preload() {

    }

    create() {
        const map = this.make.tilemap({key: "level1", tileWidth: 32, tileHeight: 32});
        const tileset = map.addTilesetImage("worldTileset","worldTileset");
        const bg = map.createStaticLayer("Background", tileset, 0, 0);
        const groundPlatforms = map.createDynamicLayer("Ground Platforms", tileset, 0,0);
        groundPlatforms.setCollisionByExclusion([-1]);
        const bgDetails = map.createDynamicLayer("Background Details", tileset, 0,0);
        const bridgePlatform = map.createDynamicLayer("Bridge", tileset, 0,0);

        this.player = this.physics.add.sprite(500,80,"player").setFrame(1);
        this.player.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.physics.add.collider(this.player,groundPlatforms);
        }

    update() {
        let moveSpeed = this.shiftKey.isDown ? 175 : 100;

        if (cursors.right.isDown) {
            this.player.setVelocityX(moveSpeed);
        } else if (cursors.left.isDown) {
            this.player.setVelocityX(-moveSpeed);
        }
        else {
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
        }

        if (cursors.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-300);
        }
    }
}
