var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 30},
            debug:true
        }

    },

    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

var text;
var platforms;
var player;
var score = 0;
var scoreText;

function preload ()
{
    this.load.image('fundo', 'assets/praia.jpg');
    this.load.image('picole', 'assets/picole2.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('dude','assets/dude.png', 
     { frameWidth: 32, frameHeight: 48 });
    
}

function create (){

    this.add.image(400, 300, 'fundo');
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(650, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
        picole = this.physics.add.sprite(400, 0, 'picole').setScale(0.5); // tamanho picole
        picole.setCollideWorldBounds(true); // coloca bordas no mundo
        picole.setBounce(0.7); // quanto o obj bate e estica
    
     

        player.body.setGravityY(300)
        
        this.physics.add.collider(player, platforms); // realiza a colisão

        picole = this.physics.add.group({
            key: 'picole',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        picole.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });

        this.physics.add.collider(picole, platforms);

        this.physics.add.overlap(player, picole, collectPicole, null, this);

        function collectPicole (player, picole)
{
    picole.disableBody(true, true);

}

scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  
function collectPicole (player, picole)
{
    picole.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

}
    


function update ()
{
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
    

}