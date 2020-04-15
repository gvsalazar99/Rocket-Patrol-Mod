//Grecia V Salazar 
//In Play.js, I Implement the 'FIRE' UI text from the original game (10) in lines 95-107

//


let config = {
    type: Phaser.CANVAS,
    width:640,
    height:480,
   scene: [ Menu , Play] 
};

let game = new Phaser.Game(config);
// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}

//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;

