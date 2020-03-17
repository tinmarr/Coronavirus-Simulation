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

var game = new Phaser.Game(config),
    isolateDay = 15,
    numOfPeople = 200,
    healthy = 200,
    ill = 0,
    recovered = 0,
    dead = 0,
    day = 0;

function preload(){
    this.load.image('0','imgs/healthy.png');
    this.load.image('1','imgs/ill.png');
    this.load.image('2','imgs/recovered.png');
    this.load.image('wall','imgs/wall.png');
}

function create(){
    scene = this;
    world = new World(numOfPeople, 1);
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
            new House((i*100) + 100, 550, 100, 100);
        }
    }
    scene.time.delayedCall(1000,increaseDay);
}

function updateStats(){
    document.getElementById('date').innerHTML = day;
    document.getElementById('h').innerHTML = healthy;
    document.getElementById('i').innerHTML = ill;
    document.getElementById('r').innerHTML = recovered;
    document.getElementById('d').innerHTML = dead;
    document.getElementById('t').innerHTML = numOfPeople;
}