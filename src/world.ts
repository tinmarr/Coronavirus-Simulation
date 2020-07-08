class World {
    ballClasses : Balls[];
    ballSprites : Phaser.Physics.Arcade.Sprite[];
    constructor(n : number){
        day = 0;
        this.ballClasses = [];
        this.ballSprites = [];
        for (var i=0;i<n;i++){
            var ball = new Balls(Math.random() * scene.game.canvas.width, Math.random() * scene.game.canvas.height, '0', 0, this);
            i === 0 ? ball.changeState('1') : {};
            this.add(ball);
        }
        scene.physics.add.collider(this.ballSprites, this.ballSprites, this.ballClasses[0].collide)
    }
    add(ball : Balls){
        this.ballClasses.push(ball);
        this.ballSprites.push(ball.sprite);
    }
    remove(ball : Balls){
        this.ballSprites.splice(this.ballClasses.indexOf(ball), 1);
        this.ballClasses.splice(this.ballClasses.indexOf(ball), 1);
    }
    getClass(sprite : Phaser.Physics.Arcade.Sprite){
        return this.ballClasses[this.ballSprites.indexOf(sprite)];
    }
    destroy(){
        for (var i=0;i<this.ballSprites.length;i++){
            this.ballSprites[i].destroy();
        }
        scene.time.removeAllEvents();
    }
}