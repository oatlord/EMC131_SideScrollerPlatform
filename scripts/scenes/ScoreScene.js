class ScoreScene extends Phaser.Scene {
    constructor() {
        super('ScoreScene');
        this.score = 0;
    }

    create () {
        const scoreText = this.add.text(80, 300, "Score: " + this.score).setOrigin(0,0);
        const level1 = this.scene.get('Level1');
        const level2 = this.scene.get('Level2');
        const level3 = this.scene.get('Level3');

        // level1.events.on('addScore', () => {
        //     this.score += 10;
        //     scoreText.setText("Score: "+this.score);
        //     console.log(this.score);
        // }, this);
    }
}