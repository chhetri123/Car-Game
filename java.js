const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const container = document.querySelector('.container');

// buttons
const up = document.querySelector('.btn__up');
const down = document.querySelector('.btn__down');
const right = document.querySelector('.btn__right');
const left = document.querySelector('.btn__left');

//
if (window.innerHeight > 1000) {
  container.style.transform = 'scale(1) translateY(0)';
} else if (window.innerHeight > 500 || window.innerHeight < 500) {
  // console.log(window.innerHeight);
  document.querySelector('.button').style.display = 'none';
  container.style.height = '600px';
  container.style.transform = 'scale(0.8) translateY(-60px)';
}
var audio = new Audio('main.mp3');
var audiol = new Audio('hornL.mp3');
var audio2 = new Audio('crashman1.mp3');
var audio3 = new Audio('MouseClick1.mp3');

function aud() {
  audio.play();
}

startScreen.addEventListener('click', start);
startScreen.addEventListener('keypress', space);
function space(event) {
  if (event.keyCode === 32 || event.which === 32) {
    start();
  }
}

let player = {
  speed: 5,
  score: 0,
  highScore: 0,
};

let keys = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
};
document.addEventListener('keydown', keyDown);
// [up, down, right, left].forEach((el) => {
//   el.addEventListener('click', keyDown.bind(el));
// });

// [up, down, right, left].forEach((el) => {
//   el.addEventListener('click', keyUp.bind(el));
// });
// [up.down].addEventListener

// function accelerateCar() {}
document.addEventListener('keyup', keyUp);

// async function event() {
//   await setTimeout(() => {
//
//     );
//   }, 1);
// }

//document.addEventListener('keyleft',keyLeft);
//document.addEventListener('keyright',keyRight);

function keyDown(e, el) {
  // console.log(this);
  // if (e.key === undefined) {
  //   if (this.dataset.value === '1') {
  //     keys['ArrowUp'] = true;
  //     // console.log('up');
  //   }
  //   if (this.dataset.value === '2') {
  //     keys['ArrowDown'] = true;
  //     // console.log(keys);
  //   }
  //   if (this.dataset.value === '3') {
  //     keys['ArrowRight'] = true;
  //     // console.log(keys);
  //   }
  //   if (this.dataset.value === '4') {
  //     keys['ArrowLeft'] = true;
  //     // console.log(keys);
  //   }
  // } else {
  // console.log(e.key);
  keys[e.key] = true;
  // console.log(keys);
  // }
}

function keyUp(e, el) {
  // if (e.key === undefined) {
  //   if (this.dataset.value === '1') {
  //     keys['ArrowUp'] = false;
  //     // console.log('up');
  //   }
  //   if (this.dataset.value === '2') {
  //     keys['ArrowDown'] = false;
  //     // console.log(keys);
  //   }
  //   if (this.dataset.value === '3') {
  //     keys['ArrowRight'] = false;
  //     // console.log(keys);
  //   }
  //   if (this.dataset.value === '4') {
  //     keys['ArrowLeft'] = false;
  //     // console.log(keys);
  //   }
  // } else {
  keys[e.key] = false;
  // }
  // console.log(keys);
}
// }
// function checkButton(that, isTrue) {
//   console.log(that);
//   if (that.dataset.value === '1') {
//     keys['ArrowUp'] = isTrue;
//     console.log(keys);
//   }
//   if (that.dataset.value === '2') {
//     keys['ArrowDown'] = isTrue;
//     console.log(keys);
//   }
//   if (that.dataset.value === '3') {
//     keys['ArrowRight'] = isTrue;
//     console.log(keys);
//   }
//   if (that.dataset.value === '4') {
//     keys['ArrowLeft'] = isTrue;
//     console.log(keys);
//   }
// }
function moveLines() {
  let lines = document.querySelectorAll('.lines');
  lines.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';
  });
}

function isCollid(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function endGame() {
  player.start = false;
  audio.pause();
  audio2.play();
  audio2.volume = 1;
  function stop() {
    let sc;
    if (player.score > player.highScore) {
      player.highScore = player.score;
      // sc=player.highScore;
      highScore.innerText = 'HighScore' + '\n' + player.highScore;
    }
    startScreen.classList.remove('hide');
    startScreen.innerHTML =
      'Game over <br> Your Final score = ' +
      player.score +
      '<br>Your High Score =' +
      player.highScore +
      ' <br>Press to restart the Game.';
  }
  setTimeout(stop, 1000);
}

function moveEnemy(car) {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function (item) {
    if (isCollid(car, item)) {
      endGame();
    }
    if (item.y >= 750) {
      item.y = -500;
      item.style.left = Math.floor(Math.random() * 350) + 'px';
    }

    item.y += player.speed;
    item.style.top = item.y + 'px';
  });
}

function gamePlay() {
  // audio.play();
  // console.log('start');
  let car = document.querySelector('.car');
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    moveLines();
    moveEnemy(car);
    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
      audio3.play();
    }
    if (keys.ArrowDown && player.y < road.bottom - 100) {
      player.y += player.speed;
      audio3.play();
    }
    if (keys.ArrowLeft && player.x > 5) {
      player.x -= player.speed;
      audiol.play();
    }
    if (keys.ArrowRight && player.x < road.width - 69) {
      player.x += player.speed;
      audiol.play();
    }
    car.style.top = player.y + 'px';
    car.style.left = player.x + 'px';
    window.requestAnimationFrame(gamePlay);
    player.score++;
    score.innerText = 'Score' + '\n' + player.score;
  }
}

function random() {
  function c() {
    let hext = Math.floor(Math.random() * 256).toString(16);
    return ('0' + String(hext)).substr(-2);
  }

  return '#' + c() + c() + c();
}

function start() {
  //gameArea.classList.remove('hide');
  startScreen.classList.add('hide');
  gameArea.innerHTML = '';
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  aud();

  for (x = 0; x < 5; x++) {
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'lines');
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + 'px';
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  // car.innerText="i am a car";
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (x = 0; x < 5; x++) {
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class', 'enemy');
    enemyCar.y = (x + 2) * 350 * -1;
    enemyCar.style.top = enemyCar.y + 'px';
    enemyCar.style.backgroundColor = random();
    enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
    // enemyCar.style.top=Math.floor(Math.random()*300)+"px";

    gameArea.appendChild(enemyCar);
  }
}
