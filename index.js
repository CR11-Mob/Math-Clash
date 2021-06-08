const container = document.getElementById("container");

const mainContent = document.getElementById("mainContent");

const calculation = document.getElementById("calculation");
const sum = document.getElementById("sum");
const target = document.getElementById("target");

const gridBackground = document.getElementById("grid");
const gameGrid = document.getElementById("gameGrid");

const title1 = document.getElementById("title-1");
const title2 = document.getElementById("title-2");

/*************** GAME TITLE *****************/

let renderTitle = () => {
  let heading1 = "MATH";
  let heading2 = "CLASH";

  // let heading = "MATH CLASH";
  // let headingSplit = heading.split(/\s*/);
  // console.log("heading:", headingSplit);
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

/*************** DYNAMIC ARRAY ***************/



const dynamicArray = (size) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push([]);
  }
  return arr;
};

const size = 4;
let gridArr = dynamicArray(size);

const randomNumberArr = () => {
  for (let i = 0; i < gridArr.length; i++) {
    randomNum = Math.floor(Math.random() * 10);
    gridArr[i].unshift(randomNum);
    console.log();

    if (gridArr[i].length >= 4) {
      clearInterval(interval);
      console.log("Game Over!");
    }
  }
};

randomNumberArr();
// console.log(gridArr[0].length);

// console.log(gridArr);

let interval = setInterval(() => {
  gameGrid.innerText = ``;

  randomNumberArr();
  renderGrid();

  console.log(gridArr);
}, 3000);

/*************** RENDERING GAME GRID DYNAMICALLY ***************/
const targetNumber = () => {
  // let randomTargetNum = Math.floor(Math.random() * 100);
  randomTargetNum = 20;
  // console.log(randomTargetNum);
  target.innerHTML = randomTargetNum;
  return randomTargetNum;
};
targetNumber();
console.log(targetNumber());
let clickNumber = 0;
const handleClick = (e, i, j) => {
  console.log("grid", i, j);
  clickNumber += parseInt(e.target.innerText)
  console.log(clickNumber);
  // console.log("event", e);
  // console.log(e.target);
  // e.target.style.display = "none";

  // if (e.target.innerText != randomTargetNum) {
  //   setTimeout(() => {
  //     e.target.style.display = "flex";
  //   }, 2000);
  // }
  // console.log("splice:", gridArr[i].splice(j, 1));
};

const renderGrid = () => {
  for (let i = 0; i < gridArr.length; i++) {
    let col = document.createElement("div");

    col.id = `grid-col-${i + 1}`;
    col.className = "grid-col";

    for (let j = 0; j < gridArr.length; j++) {
      let gridItem = document.createElement("div");

      gridItem.id = `grid-item-${i + 1}-${j + 1}`;
      gridItem.className = "grid-item";

      gridItem.innerText = gridArr[i][j];

      if (gridArr[i][j] === undefined) {
        gridItem.innerText = "";
      }

      // if (gridArr[i].length >= 4) {
      //   clearInterval(interval);
      // }

      gridItem.addEventListener("click", (e) => {
        handleClick(e, i, j);
      });
      col.append(gridItem);
    }
    gameGrid.append(col);
  }
};
renderGrid();

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
