class Balls {
	constructor(x, y, healthState, movementState, world){
        this.sprite = scene.physics.add.sprite(x, y, healthState);
        this.sprite.setScale(0.025);

        this.healthState = healthState;
        this.movementState = movementState;

        this.sprite.body.collideWorldBounds = true;
        this.sprite.setBounce(1);
        this.sprite.setFriction(0);

        if (this.movementState === 0) {
            var startingRotation = (Math.PI/180) * (Math.random() * 360);
            this.sprite.setVelocity(Math.cos(startingRotation) * 100, Math.sin(startingRotation) * 100);
        } else {
            this.sprite.body.immovable = true;
        }

        scene.physics.add.collider(this.sprite, world.ballSprites, this.collide);

        if (this.healthState === '1'){
            scene.time.delayedCall(14000, ()=>{
                this.changeState('2');
            });
        }
    }
    collide(main, other){
        var mainDirection = Math.atan(main.body.velocity.y/main.body.velocity.x) + (Math.sign(main.body.velocity.x) === -1 ? Math.PI : 0);
        var otherDirection = Math.atan(other.body.velocity.y/other.body.velocity.x) + (Math.sign(other.body.velocity.x) === -1 ? Math.PI : 0);
        if (world.getClass(main).movementState === 0){
            main.setVelocity(Math.cos(mainDirection) * 100, Math.sin(mainDirection) * 100);
        }
        if (world.getClass(other).movementState === 0){
            other.setVelocity(Math.cos(otherDirection) * 100, Math.sin(otherDirection) * 100);
        }
        if (world.getClass(main).healthState === '1' ? !(world.getClass(other).healthState === '1') : (world.getClass(other).healthState === '1')){
            scene.time.delayedCall(Math.floor((Math.random()*14)+2) *1000, ()=>{
                world.getClass(main).changeState('1');
            });
            scene.time.delayedCall(Math.floor((Math.random()*14)+2) *1000, ()=>{
                world.getClass(other).changeState('1');
            });
        }
    }
    changeState(newState){
        if (this.healthState === '2' && newState === '1'){
            return;
        } else if (this.healthState !== newState){
            this.healthState = newState;
            this.sprite.setTexture(newState);
            if (this.healthState === '1'){
                ill++;
                healthy--;
                scene.time.delayedCall(21000, ()=>{
                    if (Math.random() <= 0.03){
                        world.remove(this);
                        this.sprite.destroy();
                        numOfPeople--;
                        dead++;
                    } else {
                        this.changeState('2');
                        ill--;
                        recovered++;
                    }
                });
            }
        }
    }
}