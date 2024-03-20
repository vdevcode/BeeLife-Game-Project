var rows = 3;
var columns = 3;

var currTile;
var otherTile;
var turns = 0;
var points = 0;

let imgOrder = [
  "/imageonline/00",
  "/imageonline/10",
  "/imageonline/20",
  "/imageonline/01",
  "/imageonline/11",
  "/imageonline/21",
  "/imageonline/02",
  "/imageonline/12",
  "/imageonline/3",
];

let originalOrder;

function shuffleAndSaveOriginalOrder() {
  originalOrder = [...imgOrder]; 
  imgOrder.sort(() => Math.random() - 0.5);
}

shuffleAndSaveOriginalOrder();

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = imgOrder.shift() + ".png";
      tile.addEventListener("mousedown", dragStart);
      tile.addEventListener("touchstart", touchStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);
      document.getElementById("board").append(tile);
    }
  }
  document
    .getElementById("restart-button")
    .addEventListener("click", restartGame);

  if (localStorage.getItem("points")) {
    points = parseInt(localStorage.getItem("points"));
    document.getElementById("points").innerText = points;
  }
};

function touchStart(e) {
  e.preventDefault();
  currTile = this;
  document.addEventListener("touchmove", touchMove);
  document.addEventListener("touchend", touchEnd);
}

function touchMove(e) {
  e.preventDefault();
  otherTile = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY
  );
}

function touchEnd() {
  document.removeEventListener("touchmove", touchMove);
  document.removeEventListener("touchend", touchEnd);

  if (!otherTile.src.includes("3.png")) {
    return;
  }

  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;

    if (isGameCompleted()) {
      alert("Bạn đã hoàn thành game!!!");
      points += 50;
      diemTri += 10;
      document.getElementById("points").innerText = points;
      savePoints();
      increaseDiemTri.innerHTML = diemTri; 
    }
  }
}

function isGameCompleted() {
  for (let i = 0; i < originalOrder.length; i++) {
    let currentTile = document.getElementById(
      Math.floor(i / columns).toString() + "-" + (i % columns).toString()
    );

    if (originalOrder[i] !== currentTile.src) {
      return false;
    }
  }
  return true;
}

function savePoints() {
  localStorage.setItem("points", points);
}

function restartGame() {
  location.reload();
}

const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "./play.html";
});

function dragStart() {
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (!otherTile.src.includes("3.png")) {
    return;
  }

  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;

    if (isGameCompleted()) {
      alert("Bạn đã hoàn thành game!!!");
      const diemTri = JSON.parse(localStorage.getItem("diem-tri")) || 0
      points += 50;
      diemTri += 10;
      document.getElementById("points").innerText = points;
      localStorage.setItem("diem-tri", diemTri)
      savePoints();
      increaseDiemTri.innerHTML = diemTri; 
    }
  }
}

document.getElementById("hack-button").addEventListener("click", hackPuzzle);

function hackPuzzle() {
  imgOrder = [...originalOrder];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.src = imgOrder.shift() + ".png";
    }
  }
}
