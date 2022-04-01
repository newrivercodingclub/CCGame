class Sprite {
    constructor(config) {

        //Set up image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true; //boolean token that confirms sprite is loaded, wont draw until sprite is loaded
        }
        
        //Shadow
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }
        

        //Configure Animation and initial state
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ],
            // walkDown: [
            //     [0,0], [1,0], [2,0], [3,0]
            // ],

        }
        this.currentAnimation = config.currentAnimation || "idleDown"; //performs current animation or when no current animation is being passed in defaults to "idleDown"
        this.currentAnimationFrame = 0;

        //Reference the game object
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x * 16 - 8; // x is square, 16 due to 16x16 grid, -8 due to spritesheet offset
        const y = this.gameObject.y *16 -18; //same as above, -18 due to sprite sheet offset

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);//shadow must load before stacked object on shadow
        //below checks for load token then draws, else it will fail "silently" https://youtu.be/bpbghr3NnUU?t=876
        this.isLoaded && ctx.drawImage(this.image, 
            0, 0, //x and y cut location on sprite
            32, 32, //x and y cut width on sprite
            x, y, // x and y render locaton
            32, 32, //size of render
            )
    }
}