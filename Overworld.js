class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".main");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0); //source, draw location x, draw location y
    };
    image.src = "./images/maps/109base.png";

    //Place game objects

    const player = new GameObject({
      x: 1,
      y: 2,
    });

    const npc1 = new GameObject({
      x: 5,
      y: 6,
      src: "./images/characters/people/npc1.png",
    });
    setTimeout(() => {
      //sets a wait parameter for drawing to 200 ms, will be replaced later with loop check for draw
      player.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 1000);
  }
}
