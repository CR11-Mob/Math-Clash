const container = document.getElementById("container");

const mainContent = document.getElementById("mainContent");

const calculation = document.getElementById("calculation");
const sum = document.getElementById("sum");
const equalSign = document.getElementById("equal-sign");
const target = document.getElementById("target");

const score = document.getElementById("score-bar");

const gridBackground = document.getElementById("grid");
const gameGrid = document.getElementById("gameGrid");

const restartGame = document.getElementById("restart");

const title1 = document.getElementById("title-1");
const title2 = document.getElementById("title-2");

/*************** GAME TITLE *****************/

let renderTitle = () => {
  let heading1 = "MATH";
  let heading2 = "CLASH";

  let mathSplit = heading1.split("");
  let clashSplit = heading2.split("");

  for (let i = 0; i < heading1.length; i++) {
    let div1 = document.createElement("div");

    div1.id = `word-1-${i + 1}`;
    div1.className = "head1-word";
    div1.innerHTML = `${mathSplit[i]}`;
    title1.append(div1);
  }
  for (let j = 0; j < heading2.length; j++) {
    let div2 = document.createElement("div");

    div2.id = `word-2-${j + 1}`;
    div2.className = "head2-word";
    div2.innerHTML = `${clashSplit[j]}`;
    title2.append(div2);
  }
};
renderTitle();

/**************** VARIABLE DECLARATION ***************/

let playerScore = 0;
let isGameover = false;

const minimumNumber = 20;
const maximumNumber = 100;
const randomMutiplier = maximumNumber - minimumNumber;

let interval = null;
const intervalTime = 5000;

/*************** DYNAMIC ARRAY ***************/

const dynamicArray = (size) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push([]);
  }
  return arr;
};

const size = 6;
let gridArr = dynamicArray(size);
let copyGridArr = dynamicArray(size);

/*************** PUSHING RANDOM NUMBER INTO DYNAMIC ARRAY ***************/

const randomNumberArr = () => {
  for (let i = 0; i < gridArr.length; i++) {
    if (gridArr[i].length >= size) {
      endInterval();
      isGameover = true;
    }
    randomNum = Math.ceil(Math.random() * 10);
    gridArr[i].unshift(randomNum);
    copyGridArr[i].unshift(false);
  }
  // console.log("copy arr:", gridArr);

  // console.log("copy arr:", copyGridArr);
};

randomNumberArr();

/*************** INTERVAL ***************/

const startInterval = () => {
  interval = setInterval(() => {
    randomNumberArr();
    renderGrid();
  }, intervalTime);
};
startInterval();

const endInterval = () => clearInterval(interval);

/*************** RENDERING GAME GRID DYNAMICALLY ***************/

/*************** RANDOM TARGET NUMBER ***************/

let randomTargetNum = null;
let clickNumber = 0;

const targetNumber = () => {
  randomTargetNum = minimumNumber + Math.ceil(Math.random() * randomMutiplier);

  target.innerHTML = randomTargetNum;

  equalSign.innerHTML = `<span id = "sign-span"></span>`;

  score.innerHTML = `Your Score: ${playerScore}`;

  sum.innerHTML = clickNumber;

  return randomTargetNum;
};
targetNumber();

const gameOver = () => {
  if (isGameover) {
    score.innerHTML = `Game Over!`;
  }
  return isGameover;
};

const handleClick = (e, i, j) => {
  if (gameOver()) return;

  if (copyGridArr[i][j]) {
    copyGridArr[i][j] = false;
    clickNumber -= parseInt(e.target.innerText);
  } else {
    copyGridArr[i][j] = true;
    clickNumber += parseInt(e.target.innerText);
  }

  sum.innerHTML = clickNumber;

  winCheck();

  renderGrid();
};

const winCheck = () => {
  if (clickNumber === randomTargetNum) {
    deleteCells();
    clickNumber = 0;

    playerScore += 10;

    score.innerHTML = `Your Score: ${playerScore}`;

    document.getElementById("sign-span").style.backgroundImage =
      "url(/Images/equal-sign.svg)";

    setTimeout(() => {
      document.getElementById("sign-span").style.backgroundImage =
        "url(/Images/not-equal.svg)";

      sum.innerText = 0;
    }, 2000);
  } else if (clickNumber > randomTargetNum) {
    resetCells();
    clickNumber = 0;
    sum.innerHTML = 0;
  }
};

const deleteCells = () => {
  for (let i = 0; i < gridArr.length; i++) {
    for (let j = 0; j < gridArr.length; j++) {
      if (copyGridArr[i][j] === true) {
        console.log("Splice", gridArr[i].splice(j, 1));
        copyGridArr[i][j] = false;
      }
    }
  }
};
const resetCells = () => {
  for (let i = 0; i < gridArr.length; i++) {
    for (let j = 0; j < gridArr.length; j++) {
      copyGridArr[i][j] = false;
    }
  }
};

const renderGrid = () => {
  if (gameOver()) return;
  gameGrid.innerText = ``;
  for (let i = 0; i < gridArr.length; i++) {
    let col = document.createElement("div");

    col.id = `grid-col-${i + 1}`;
    col.className = "grid-col";

    for (let j = 0; j < gridArr.length; j++) {
      let gridItem = document.createElement("div");

      gridItem.id = `grid-item-${i + 1}-${j + 1}`;
      gridItem.className = "grid-item";

      if (copyGridArr[i][j] === true) {
        gridItem.classList.add("color");
      }

      gridItem.innerText = gridArr[i][j];

      if (gridArr[i][j] === undefined) {
        gridItem.innerText = "";
      }

      gridItem.addEventListener("click", (e) => {
        handleClick(e, i, j);
      });
      col.append(gridItem);
    }
    gameGrid.append(col);
  }
};
renderGrid();

let gameRestart = () => {
  restartGame.innerHTML = `<span id = "restart-btn">RESTART GAME</span>`;

  document.getElementById("restart-btn").addEventListener("click", () => {
    window.location.reload();
  });
};
gameRestart();

// let dynamicArr = () => {
// let Arr = Array.from(gameGrid);
// console.log("array:", Arr);
//   for (let i = 0; i < gameGrid.querySelectorAll(".grid-col").length; i++) {
//     let colArr = Array.from(document.getElementById(`grid-col-${i + 1}`));
//     gridArr.push(colArr);
//     console.log("col arr", colArr);
//   }
// };
// dynamicArr();
