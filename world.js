class World {
    constructor(n, simulationType){
        day = 0;
        this.ballClasses = [];
        this.ballSprites = [];
        for (var i=0;i<n;i++){
            var ball = new Balls(Math.random() * scene.game.canvas.width, Math.random() * scene.game.canvas.height, i==0 ? '1' : '0', 0, this);
            this.add(ball);
        }
        healthy--;
        ill++;
    }
    add(ball){
        this.ballClasses.push(ball);
        this.ballSprites.push(ball.sprite);
    }
    remove(ball){
        this.ballSprites.splice(this.ballClasses.indexOf(ball), 1);
        this.ballClasses.splice(this.ballClasses.indexOf(ball), 1);
    }
    getClass(sprite){
        return this.ballClasses[this.ballSprites.indexOf(sprite)];
    }
    destroy(){
        for (var i=0;i<this.ballSprites.length;i++){
            this.ballSprites[i].destroy();
        }
        scene.time.removeAllEvents();
    }
}