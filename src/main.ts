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

let game = new Phaser.Game(config),
    isolateDay = -1,
    day = 0,
    scene : Phaser.Scene,
    world : World;

function preload(){
    this.load.image('0','imgs/healthy.png');
    this.load.image('1','imgs/ill.png');
    this.load.image('2','imgs/recovered.png');
    this.load.image('wall','imgs/wall.png');
}

function create(){
    scene = this;
    this.time.delayedCall(1000,increaseDay);
}

function update(){}

function increaseDay(){
    day++;
    if (day === isolateDay){
        for (var i=0;i<8;i++){
            new House((i*100) + 100, 50, 100, 100);
        }
        for (var i=0;i<8;i++){
            new House((i*100) + 100, 150, 100, 100);
        }
        for (var i=0;i<8;i++){
            new House((i*100) + 100, 450, 100, 100);
        }
        for (var i=0;i<8;i++){
            new House((i*100) + 100, 550, 100, 100);
        }
    }
    scene.time.delayedCall(1000,increaseDay);
}

function createWorld() : World {
    world.destroy();
    let numOfPeople : number = parseFloat((<HTMLInputElement>document.getElementById('numPeople')).value);
    return new World(numOfPeople);
}