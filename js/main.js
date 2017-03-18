
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var TILE_W = 32;
var TILE_H = 32;
var TILE_SPRITE = 'unicorn32';



var sprite;

var player;
var cursors;
var map;
var layer;
var currentLayer;
var currentTile = 0;


var pointerSprite;
var unicornSprite;

var MAP_MAX_W = 128;
var MAP_MAX_H = 128;


var groupTiles;
var groupOverlays;
var groupCursors;




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
    image = game.load.image('unicorn32', 'assets/unicorn32.png');
    image.smoothed = false;

    game.load.image('pointer', 'assets/pointer.png');


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


    groupTiles = game.add.group();
    groupOverlays = game.add.group();
    groupCursors = game.add.group();

/*
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    sprite = game.add.sprite(400, 300, 'unicorn');
    sprite.anchor.setTo(0.5, 0.5);


    game.add.tileSprite(0, 0, 1920, 1920, 'unicorn64');
*/




    //  Creates a blank tilemap
    map = game.add.tilemap();

    //  Add a Tileset image to the map
    map.addTilesetImage(TILE_SPRITE);




    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 40x30 tiles in size and the tiles are TILE_WxTILE_H pixels in size.
    layer = map.create('level1', MAP_MAX_W, MAP_MAX_H, TILE_W, TILE_H);
    layer.scrollFactorX = 0.5;
    layer.scrollFactorY = 0.5;

    //  Resize the world
    layer.resizeWorld();



    currentLayer = layer;


    map.putTile(0, 10, 10, currentLayer);






    //  Create our tile selector at the top of the screen
    createTileSelector();

    game.input.addMoveCallback(updateMarker, this);    

    cursors = game.input.keyboard.createCursorKeys();



/*
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.p2.enable(player);
    player.body.fixedRotation = true;

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);    
*/




    unicornSprite = game.add.sprite(100, 300, 'unicorn64');
    unicornSprite.fixedToCamera = true;



    pointerSprite = game.add.sprite(200, 300, 'pointer');
    pointerSprite.fixedToCamera = true;
   // groupCursors.add(pointerSprite);    


debugger;
    for (var y=0; y<MAP_MAX_H; ++y)
    {
        for (var x=0; x<MAP_MAX_W; ++x)
        {
            map.putTile(currentTile, x, y, currentLayer);
        }
    }

    map.fill(currentTile, 0, 0, 10, 10, currentLayer);

   
}


function update () {
    
    //sprite.angle += 1;
    
/*
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
*/

  //  move_camera_by_pointer(game.input.mousePointer);


    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    updateMarker();
}

function render() {

    game.debug.text("Canvas", 32, 32);
    //game.debug.spriteInfo(sprite, 32, 64);


    game.debug.text('MouseX=' + game.input.activePointer.x + ' MouseY=' + game.input.activePointer.y, 16, 550);    
}

var o_mcamera;

function move_camera_by_pointer(o_pointer) {
    if (!o_pointer.timeDown) { return; }
    if (o_pointer.isDown && !o_pointer.targetObject) {
        if (o_mcamera) {
            game.camera.x += o_mcamera.x - o_pointer.position.x;
            game.camera.y += o_mcamera.y - o_pointer.position.y;
        }
        o_mcamera = o_pointer.position.clone();
    }
    if (o_pointer.isUp) { o_mcamera = null; }
}


function pickTile(sprite, pointer) {

    currentTile = game.math.snapToFloor(pointer.x, TILE_W) / TILE_W;

}

function updateMarker() {


    pointerSprite.x = 0;//game.input.activePointer.x;
    pointerSprite.y = 0;//game.input.activePointer.y;
    
    //unicornSprite.x = 0;game.input.activePointer.x;
    //unicornSprite.y = 0;game.input.activePointer.y;

    pointerSprite.cameraOffset.setTo(game.input.activePointer.x, game.input.activePointer.y);

    marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * TILE_W;
    marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * TILE_H;

    if (game.input.mousePointer.isDown)
    {
        map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
//        map.putTile(currentTile, 10,10 , currentLayer);
        
     //map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);

    }

}




function createTileSelector() {

    //  Our tile selection window
    var tileSelector = game.add.group();

    var tileSelectorBackground = game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(0, 0, 800, 34);
    tileSelectorBackground.endFill();

    tileSelector.add(tileSelectorBackground);

    var tileStrip = tileSelector.create(1, 1, TILE_SPRITE);
    tileStrip.inputEnabled = true;
    tileStrip.events.onInputDown.add(pickTile, this);

    tileSelector.fixedToCamera = true;

    //  Our painting marker
    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, TILE_W, TILE_H);

}