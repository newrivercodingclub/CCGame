class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".main");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "./images/maps/109base.png";
    
    const x=20;
    const y=24;
    const player = new Image();
    player.onload = () => {
        this.ctx.drawImage(
            player,
            0,//left cut
            0,//top cut
            32,//cut width
            32,//cut height
            x,//x render location
            y,//
            32,//size of x cut render
            32 //size of y cut render         
            )
    }
    player.src = "./images/characters/people/player.png"
  }
}
