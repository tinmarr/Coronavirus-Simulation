class Balls {
    constructor(x, y, healthState, movementState, world) {
        this.sprite = scene.physics.add.sprite(x, y, healthState);
        this.sprite.setScale(0.025);
        this.healthState = healthState;
        this.movementState = movementState;
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(1);
        this.sprite.setFriction(0);
        if (this.movementState === 0) {
            var startingRotation = (Math.PI / 180) * (Math.random() * 360);
            this.sprite.setVelocity(Math.cos(startingRotation) * 100, Math.sin(startingRotation) * 100);
        }
        else {
            this.sprite.body.immovable = true;
        }
        if (this.healthState === '1') {
            scene.time.delayedCall(14000, () => {
                this.changeState('2');
            });
        }
    }
    collide(main, other) {
        var mainDirection = Math.atan(main.body.velocity.y / main.body.velocity.x) + (Math.sign(main.body.velocity.x) === -1 ? Math.PI : 0);
        var otherDirection = Math.atan(other.body.velocity.y / other.body.velocity.x) + (Math.sign(other.body.velocity.x) === -1 ? Math.PI : 0);
        if (world.getClass(main).movementState === 0) {
            main.setVelocity(Math.cos(mainDirection) * 100, Math.sin(mainDirection) * 100);
        }
        if (world.getClass(other).movementState === 0) {
            other.setVelocity(Math.cos(otherDirection) * 100, Math.sin(otherDirection) * 100);
        }
        if (world.getClass(main).healthState === '1' ? !(world.getClass(other).healthState === '1') : (world.getClass(other).healthState === '1')) {
            scene.time.delayedCall(Math.floor((Math.random() * 14) + 2) * 1000, () => {
                world.getClass(main).changeState('1');
            });
            scene.time.delayedCall(Math.floor((Math.random() * 14) + 2) * 1000, () => {
                world.getClass(other).changeState('1');
            });
        }
    }
    changeState(newState) {
        if (this.healthState === '2' && newState === '1') {
            return;
        }
        else if (this.healthState !== newState) {
            this.healthState = newState;
            this.sprite.setTexture(newState);
            if (this.healthState === '1') {
                scene.time.delayedCall(21000, () => {
                    if (Math.random() <= 0.03) {
                        world.remove(this);
                        this.sprite.destroy();
                    }
                    else {
                        this.changeState('2');
                    }
                });
            }
        }
    }
}
class House {
    constructor(x, y, width, height) {
        this.left = scene.physics.add.sprite(x, y, 'wall');
        this.left.scaleY = height / 2;
        this.left.scaleX = 10;
        this.left.x -= width - 10;
        this.left.body.immovable = true;
        this.right = scene.physics.add.sprite(x, y, 'wall');
        this.right.scaleY = height / 2;
        this.right.scaleX = 10;
        this.right.body.immovable = true;
        this.up = scene.physics.add.sprite(x, y, 'wall');
        this.up.scaleY = 5;
        this.up.scaleX = width;
        this.up.y -= height / 2 - 5;
        this.up.body.immovable = true;
        this.down = scene.physics.add.sprite(x, y, 'wall');
        this.down.scaleY = 5;
        this.down.scaleX = width;
        this.down.y += height / 2 - 5;
        this.down.body.immovable = true;
        this.walls = [this.left, this.right, this.down, this.up];
        scene.physics.add.collider(this.walls, world.ballSprites);
    }
}
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
let game = new Phaser.Game(config), isolateDay = -1, day = 0, scene, world;
function preload() {
    this.load.image('0', 'imgs/healthy.png');
    this.load.image('1', 'imgs/ill.png');
    this.load.image('2', 'imgs/recovered.png');
    this.load.image('wall', 'imgs/wall.png');
}
function create() {
    scene = this;
    this.time.delayedCall(1000, increaseDay);
}
function update() { }
function increaseDay() {
    day++;
    if (day === isolateDay) {
        for (var i = 0; i < 8; i++) {
            new House((i * 100) + 100, 50, 100, 100);
        }
        for (var i = 0; i < 8; i++) {
            new House((i * 100) + 100, 150, 100, 100);
        }
        for (var i = 0; i < 8; i++) {
            new House((i * 100) + 100, 450, 100, 100);
        }
        for (var i = 0; i < 8; i++) {
            new House((i * 100) + 100, 550, 100, 100);
        }
    }
    scene.time.delayedCall(1000, increaseDay);
}
function createWorld() {
    world.destroy();
    let numOfPeople = parseFloat(document.getElementById('numPeople').value);
    return new World(numOfPeople);
}
class World {
    constructor(n) {
        day = 0;
        this.ballClasses = [];
        this.ballSprites = [];
        for (var i = 0; i < n; i++) {
            var ball = new Balls(Math.random() * scene.game.canvas.width, Math.random() * scene.game.canvas.height, '0', 0, this);
            i === 0 ? ball.changeState('1') : {};
            this.add(ball);
        }
        scene.physics.add.collider(this.ballSprites, this.ballSprites, this.ballClasses[0].collide);
    }
    add(ball) {
        this.ballClasses.push(ball);
        this.ballSprites.push(ball.sprite);
    }
    remove(ball) {
        this.ballSprites.splice(this.ballClasses.indexOf(ball), 1);
        this.ballClasses.splice(this.ballClasses.indexOf(ball), 1);
    }
    getClass(sprite) {
        return this.ballClasses[this.ballSprites.indexOf(sprite)];
    }
    destroy() {
        for (var i = 0; i < this.ballSprites.length; i++) {
            this.ballSprites[i].destroy();
        }
        scene.time.removeAllEvents();
    }
}
//# sourceMappingURL=built.js.map