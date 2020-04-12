//Rocket Prefab

class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        
        //add an object to the existing scene
        //scene that is being passed into object (Play), add 
        //"this" object to the existing scene 
        scene.add.existing(this);
        this.isFiring= false; //track rocket's firing status
    }
    update(){
        //left/right movement 
        if(!this.ifFiring){
            if(keyLEFT.isDown && this.x >=47){
                this.x-=2;
            } else if (keyRIGHT.isDown && this.x <= 578){
                this.x+=2;
            }
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)){  //IsDown:checks the condition each frame, JustDown:waits until player takes finger off button
            this.isFiring=true;
        }
        //if fired, move up
        if(this.isFiring && this.y >=108){
            this.y -=2;

        }
        //reset on miss 
        if(this.y <= 108){
            this.isFiring = false;
            this.y= 431;
        }

    }
}

