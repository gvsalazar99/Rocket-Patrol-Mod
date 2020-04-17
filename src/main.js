//Grecia V Salazar 
//In Play.js, I Implement the 'FIRE' UI text from the original game in lines 95-107. (10)

//In Play.js, I implemented Add your own (copyright-free) background music to the Play scene 
//in lines 22 &23. (10)

//In Rocket.js, I implemented Allow the player to control the Rocket after it's fired in line 17 (10)

//In Play.js, I implemented Replace the UI borders with new artwork in line 34 (purple border) (15)

//In Play.js, I implemented Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
// where rocket updates, in preload, and check collisions. (25)

//In Play.js, I implemented Create a new scrolling tile sprite for the background (10) (the moon)

//In Main.js and Menu.js, I implemented Create a new title screen in lines 22 in Main and 36-40 in Menu. (15)

//In Play.js, I implemented paralax scrolling by adding 2 mountains (15) lines 138,139 and preload


let config = {
    type: Phaser.CANVAS,
    width:640,
    height:480,
    backgroundColor: '#4f006d',
   scene: [ Menu , Play] 
};

let game = new Phaser.Game(config);
// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    

    
   // this.add.text(20, 20, "Time:",gameTimer);
}


//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;




