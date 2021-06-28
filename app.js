//DOM Elements
const score = document.querySelector(".score");
const gameArea = document.querySelector(".game_area");
const messageArea = document.querySelector(".message_area");
let player = { speed: 5 };
//Declaring object to store keys
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

//Function for key down event
function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
}
//Function for keu up event
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}
//Function to play game
function playGame() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  console.log("Game started");
  if (player.start) {
    //Adding boundary conditions
    if (keys.ArrowRight && player.x < road.width - 100 + 15) {
      player.x += player.speed;
    }
    if (keys.ArrowLeft && player.x > -28) {
      player.x -= player.speed;
    }
    if (keys.ArrowUp && player.y > road.top + 200) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 120) {
      player.y += player.speed;
    }
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    window.requestAnimationFrame(playGame);
  }
}
//Function to start game
function startGame() {
  messageArea.classList.add("hide");
  gameArea.classList.remove("hide");
  player.start = true;
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
}
//Key event listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//Start game event listener
messageArea.addEventListener("click", startGame);
