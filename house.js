class House {
    constructor(x,y,width,height){
        this.left = scene.physics.add.sprite(x,y,'wall');
        this.left.scaleY = height/2;
        this.left.scaleX = 10;
        this.left.x -= width-10
        this.left.body.immovable = true;

        this.right = scene.physics.add.sprite(x,y,'wall');
        this.right.scaleY = height/2;
        this.right.scaleX = 10;
        this.right.body.immovable = true;

        this.up = scene.physics.add.sprite(x,y,'wall');
        this.up.scaleY = 5;
        this.up.scaleX = width;
        this.up.y -= height/2 - 5;
        this.up.body.immovable = true;

        this.down = scene.physics.add.sprite(x,y,'wall');
        this.down.scaleY = 5;
        this.down.scaleX = width;
        this.down.y += height/2 - 5;
        this.down.body.immovable = true;

        this.walls = [this.left, this.right, this.down, this.up];
        
        scene.physics.add.collider(this.walls, world.ballSprites);
    }
}