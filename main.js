//define canvas
var canvas;
var ctx;
//define grid properties
var gridCoordinates = [];
let height = 500;
let resolution = 10;
let squareSize = height / resolution;
//define player properties
const Player = {
  position: [0, 0],
  speed: 5, // ms
  isMoving: false,
};
//create player object
const player = Object.create(Player);

//global async sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//initializes canvas grid and player
function canvasInit() {
  canvas = document.getElementById("main");
  ctx = canvas.getContext("2d");
  canvas.height = height;
  canvas.width = height;
  let xCoord = height;
  let yCoord = height;
  //calculate grid points
  for (var x = 0; x <= resolution; x++) {
    for (var y = 0; y <= resolution; y++) {
      gridCoordinates.push({ x: xCoord, y: yCoord });
      yCoord = yCoord - squareSize;
    }
    xCoord = xCoord - squareSize;
    yCoord = height;
  }
  //begin drawing basic grid
  ctx.beginPath();
  //loop through calculated coordinates and draw a square at each point
  for (var i = 0; i < gridCoordinates.length; i++) {
    ctx.strokeRect(
      gridCoordinates[i].x,
      gridCoordinates[i].y,
      squareSize,
      squareSize
    );
  }
  //stop drawing
  ctx.closePath();

  //initialize player
  ctx.fillRect(player.position[0], player.position[1], squareSize, squareSize);
}

//call canvasInit on page load
window.onload = canvasInit;
//calls keyHandler when a key is pressed
window.addEventListener("keydown", function (event) {
  keyHandler(event);
});

//calls appropriate function for each key press
async function keyHandler(event) {
  if (!player.isMoving) {
    //player can only move if not already moving
    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        await arrowDown();
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        await arrowUp();
        break;
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        await arrowLeft();
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        await arrowRight();
        break;
      case "Space":
      case " ":    
        //begin playing background music
        var audio = new Audio("music/song1.mp3");
        audio.currentTime = 0;
        audio.pause();
        audio.play();
        break;
    }
  }
}

//********** keypress functions **********

async function arrowDown() {
  //set player to moving
  player.isMoving = true;
  //if player is not off the map
  if (player.position[1] < height - squareSize) {
    var tempY = player.position[1];
    //increment player Y player.position and clear previous path
    for (var x = 0; x < squareSize; x++) {
      ctx.clearRect(player.position[0], tempY, squareSize, squareSize);
      tempY += 1;
      ctx.strokeRect(
        player.position[0],
        player.position[1],
        squareSize,
        squareSize
      );
      ctx.fillRect(player.position[0], tempY, squareSize, squareSize);
      await sleep(player.speed);
    }
    //lock player player.position onto grid
    player.position[1] += squareSize;
  }
  //player is no longer moving
  player.isMoving = false;
}

async function arrowUp() {
  //set player to moving
  player.isMoving = true;

  if (player.position[1] > 0) {
    var tempY = player.position[1];
    //decrement player Y player.position and clear previous path
    for (var x = 0; x < squareSize; x++) {
      ctx.clearRect(player.position[0], tempY, squareSize, squareSize);
      tempY -= 1;
      ctx.strokeRect(
        player.position[0],
        player.position[1],
        squareSize,
        squareSize
      );
      ctx.fillRect(player.position[0], tempY, squareSize, squareSize);
      await sleep(player.speed);
    }
    //lock player player.position onto grid
    player.position[1] -= squareSize;
  }
  //player is no longer moving
  player.isMoving = false;
}

async function arrowLeft() {
  //set player to moving
  player.isMoving = true;

  if (player.position[0] > 0) {
    var tempX = player.position[0];
    //decrement player X player.position and clear previous path
    for (var x = 0; x < squareSize; x++) {
      ctx.clearRect(tempX, player.position[1], squareSize, squareSize);
      tempX -= 1;
      ctx.strokeRect(
        player.position[0],
        player.position[1],
        squareSize,
        squareSize
      );
      ctx.fillRect(tempX, player.position[1], squareSize, squareSize);
      await sleep(player.speed);
    }
    //lock player player.position onto grid
    player.position[0] -= squareSize;
  }
  //player is no longer moving
  player.isMoving = false;
}

async function arrowRight() {
  //set player to moving
  player.isMoving = true;

  if (player.position[0] < height - squareSize) {
    var tempX = player.position[0];
    //increment player X player.position and clear previous path
    for (var x = 0; x < squareSize; x++) {
      ctx.clearRect(tempX, player.position[1], squareSize, squareSize);
      tempX += 1;
      ctx.strokeRect(
        player.position[0],
        player.position[1],
        squareSize,
        squareSize
      );
      ctx.fillRect(tempX, player.position[1], squareSize, squareSize);
      await sleep(player.speed);
    }
    //lock player player.position onto grid
    player.position[0] += squareSize;
  }
  //player is no longer moving
  player.isMoving = false;
}
