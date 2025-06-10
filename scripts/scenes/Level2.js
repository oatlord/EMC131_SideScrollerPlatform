class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
    }

    preload() {
        this.puzzleSolved = false;
    }

    create() {
        const map = this.make.tilemap({ key: "level2", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("worldTileset", "worldTileset", 16, 16);
        const bg = map.createStaticLayer("Background", tileset, 0, 0);

        const groundPlatforms = map.createDynamicLayer("Ground Platforms", tileset, 0, 0);
        groundPlatforms.setCollisionBetween(4, 5);
        groundPlatforms.setCollisionBetween(20, 21);

        const water = map.createDynamicLayer("Water", tileset, 0, 0);
        const bgDetails = map.createDynamicLayer("Background Details", tileset, 0, 0);

        const bridgePlatform = map.createDynamicLayer("Bridge", tileset, 0, 0);
        bridgePlatform.setCollisionBetween(41, 43);

        const coinLayer = map.getObjectLayer('Coins');
        let coins = this.physics.add.group();
        coinLayer.objects.forEach(object => {
            let coin = coins.create(object.x, object.y, 'coinSprite');
            coin.body.setAllowGravity(false);
        })

        const fruitLayer = map.getObjectLayer('Fruits');
        let fruits = this.physics.add.group();
        fruitLayer.objects.forEach(object => {
            let fruit = fruits.create(object.x, object.y, 'fruitSprite').setFrame(9);
            fruit.body.setAllowGravity(false);
        })

        let finish;
        const finishLayer = map.getObjectLayer('Finish');
        finishLayer.objects.forEach(object => {
            finish = this.physics.add.sprite(object.x + 8, object.y - 8, 'worldTileset').setFrame(56);
            finish.body.setAllowGravity(false);
        })

        const enemyLayer = map.getObjectLayer('Enemies');
        let enemies = this.physics.add.group();
        enemyLayer.objects.forEach(object => {
            let enemy = enemies.create(object.x + 8, object.y - 8, 'enemySprite').setFrame(0);
            enemy.body.setAllowGravity(false);
        })

        this.physics.world.setBounds(0, 0, config.width, config.height, true, true, true, false);

        this.player = this.physics.add.sprite(80, 300, "player").setFrame(1).setScale(0.95);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        let mainCamera = this.cameras.main;
        mainCamera.setBounds(0, 0, config.width, config.height);
        mainCamera.setZoom(2);
        mainCamera.startFollow(this.player);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.time.addEvent({
            delay: 30, // milliseconds
            callback: () => {
                if (jumpHeight < -190) {
                    jumpHeight += 1;
                }
            },
            loop: true
        });

        this.physics.add.collider(this.player, groundPlatforms);
        this.physics.add.collider(this.player, bridgePlatform);
        this.physics.add.collider(this.player, enemies, enemyDamage, null, this);

        this.physics.add.overlap(this.player, coins, collectCoin, null, this);
        this.physics.add.overlap(this.player, fruits, collectFruit, null, this);
        this.physics.add.overlap(this.player, finish, switchSceneTo3, null, this);
    }

    update() {
        let moveSpeed = this.shiftKey.isDown ? 175 : 100;

        while (this.shiftKey.isDown == true && moveSpeed < 190) {
            moveSpeed++;
        }

        if (this.cursors.right.isDown) {
            this.player.flipX = false;
            this.player.anims.play('walk', true);
            this.player.setVelocityX(moveSpeed);
        } else if (this.cursors.left.isDown) {
            this.player.flipX = true;
            this.player.anims.play('walk', true);
            this.player.setVelocityX(-moveSpeed);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('stop');
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(jumpHeight);
        }
    }
}