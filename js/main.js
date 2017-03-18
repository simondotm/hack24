
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var sprite;

var player;
var cursors;

canvas = document.getElementById("canvas");

ctx = canvas.getContext('2d');

 ctx.mozImageSmoothingEnabled = false;
 ctx.webkitImageSmoothingEnabled = false;
 ctx.msImageSmoothingEnabled = false;
 ctx.imageSmoothingEnabled = false;

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    var image;

    //  The second parameter is the URL of the image (relative)
    game.load.image('unicorn', 'assets/unicorn2.jpg');
    image = game.load.image('unicorn64', 'assets/unicorn64.png');
    image.smoothed = false;


    game.scale.minWidth = 640;
    game.scale.minHeight = 480;
    game.scale.maxWidth = 1280;
    game.scale.maxHeight = 960;
    game.scale.pageAlignHorizontally = true;
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;



    game.load.image('player','assets/sprites/phaser-dude.png');

}

function create() {

    game.stage.backgroundColor = '#ffffff';
    game.stage.backgroundColor = "#4488AA";
    game.stage.smoothed = false;

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    sprite = game.add.sprite(400, 300, 'unicorn');
    sprite.anchor.setTo(0.5, 0.5);


    game.add.tileSprite(0, 0, 1920, 1920, 'unicorn64');

    game.world.setBounds(0, 0, 1920, 1920);


    game.physics.startSystem(Phaser.Physics.P2JS);
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    
    game.physics.p2.enable(player);

    player.body.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();


    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);    

}


function update () {
    
    sprite.angle += 1;
    

    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }    
}

function render() {

    game.debug.text("Canvas", 32, 32);
    game.debug.spriteInfo(sprite, 32, 64);
}