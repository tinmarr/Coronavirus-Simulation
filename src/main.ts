var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    }
};

let game = new Phaser.Game(config),
    isolateDay = 15,
    numOfPeople = 500,
    healthy = numOfPeople,
    ill = 0,
    recovered = 0,
    dead = 0,
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
    world = new World(numOfPeople);
    this.time.delayedCall(1000,increaseDay);
    updateStats();
}

function update(){ 
    updateStats();
}

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

function updateStats(){
    document.getElementById('date').innerHTML = day.toString();
    document.getElementById('h').innerHTML = healthy.toString();
    document.getElementById('i').innerHTML = ill.toString();
    document.getElementById('r').innerHTML = recovered.toString();
    document.getElementById('d').innerHTML = dead.toString();
    document.getElementById('t').innerHTML = numOfPeople.toString();
}