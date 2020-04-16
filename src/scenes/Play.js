class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprite
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('moon', './assets/moon.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('frame', './assets/purple.png');
        this.load.image('ship2', './assets/rocket2.png'); //spaceship2

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_background', './assets/music.mp3');
        //this.load.audio('sfx_noise', './backgroundNoise.wav');

    }
    
    create() {
        
        
        
        

        let backgroundNoise = this.sound.add('sfx_background');
        backgroundNoise.play();  


        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.moon = this.add.tileSprite(0, 0, 640, 480, 'moon').setOrigin(0, 0);
        this.frame = this.add.tileSprite(0, 3, 640, 480, 'frame').setOrigin(0, 0);  //NEW
    
        

        //add the rocket (p1)
        //bind to scene by using "this"
       

        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(0.5,0.5).setOrigin(0,0);
        //add spaceships 3
        this.ship01 = new Spaceship(this,game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this,game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this,game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this,game.config.width, 100, 'ship2', 0, 40).setOrigin(0,0); //new ship, smaller



         //define keyboard keys
        keyF= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30

        
    });
        // score
        this.p1Score = 0;
        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

    
    
       
        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        }, null, this);



        //Implement the 'FIRE' UI text from the original game (10)
        // FIRE 
        // this.fire = fire1 ;
        // Fire display
        let fire = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right', 
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.fire = this.add.text(69, 54, 'FIRE',scoreConfig);
       
    }
    
    
    

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
         this.scene.restart(this.p1Score);
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //scroll starfield
        this.starfield.tilePositionX -= 4;
        this.moon.tilePositionX -= 1;

        //this.sound.play('sfx_background'); 

        if (!this.gameOver) {       
                    
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update(); //new ship 
        } 

       // check collisions
       if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);   
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);

    }
    if (this.checkCollision(this.p1Rocket, this.ship04)) {  //new ship
        this.p1Rocket.reset();
        this.shipExplode(this.ship04);

    }

        
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
         ship.alpha = 0;               

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);

         // play explode animation
        boom.anims.play('explode');            

        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });   
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion'); 

        
           
    }
    
}

