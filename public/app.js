//DOM Elements
const score = document.querySelector(".score");
const gameArea = document.querySelector(".game_area");
const messageArea = document.querySelector(".message_area");
const difficulty = document.getElementById("difficulty");
let player = { speed: 8 };
//Declaring object to store difficulty levels
let levels = {
  easy: 8,
  medium: 10,
  hard: 12,
};
difficulty.addEventListener("change", (event) => {
  if (event.target.value === "easy") {
    player.speed = levels.easy;
  } else if (event.target.value === "medium") {
    player.speed = levels.medium;
  } else {
    player.speed = levels.hard;
  }
});
//Declaring object to store keys
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
//Creating array for enemy cars
const enemyCars = [
  "images/enemy1.png",
  "images/enemy2.png",
  "images/enemy3.png",
];
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
  //   console.log("Game started");
  if (player.start) {
    moveLines();
    moveEnemy(car);
    //Adding boundary conditions
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowUp && player.y > road.top + 200) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 70) {
      player.y += player.speed;
    }
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    window.requestAnimationFrame(playGame);
    score.innerHTML = `Score: ${player.score++}`;
  }
}
//Function to check if cars collide
function isCollide(player, enemy) {
  let playerCar = player.getBoundingClientRect();
  let enemyCar = enemy.getBoundingClientRect();
  return !(
    playerCar.top > enemyCar.bottom ||
    playerCar.bottom < enemyCar.top ||
    playerCar.left > enemyCar.right - 22 ||
    playerCar.right < enemyCar.left + 22
  );
}
//Function to end game
function endGame() {
  player.start = false;
  messageArea.classList.remove("hide");
  messageArea.innerHTML = `GAME OVER!!<br>Your Score is ${player.score}<br>Click here to Restart the game`;
}
//Function to move road lines
function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (line) {
    if (line.y > 700) {
      line.y -= 750;
    }
    line.y += player.speed;
    line.style.top = line.y + "px";
  });
}
//Function to move enemy cars
function moveEnemy(car) {
  let enemies = document.querySelectorAll(".enemy");
  enemies.forEach(function (enemy) {
    if (isCollide(car, enemy)) {
      endGame();
    }
    if (enemy.y >= 750) {
      enemy.y = -300;
      let randomEnemy = Math.floor(Math.random() * 3);
      enemy.style.backgroundImage = `url(${enemyCars[randomEnemy]})`;
      enemy.style.left = Math.floor(Math.random() * 350) + "px";
    }
    enemy.y += player.speed;
    enemy.style.top = enemy.y + "px";
  });
}
//Function to start game
function startGame() {
  gameArea.innerHTML = "";
  messageArea.classList.add("hide");
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  //Creating Lines on the road
  for (let x = 0; x < 5; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  //Creating enemy cars
  for (let x = 0; x < 3; x++) {
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemy");
    enemy.y = (x + 1) * 350 * -1;
    enemy.style.top = enemy.y + "px";
    let randomEnemy = Math.floor(Math.random() * 3);
    enemy.style.backgroundImage = `url(${enemyCars[randomEnemy]})`;
    enemy.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemy);
  }
}
//Key event listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
//Start game event listener
messageArea.addEventListener("click", startGame);
