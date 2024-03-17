const btnRankings = document.getElementById("btn-rankings");
const popup = document.getElementById("popup");

btnRankings.addEventListener("click", () => {
  popup.style.display = "block";
  popup.classList.add("active");
});

const closeBtn = document.querySelector(".close-popup");
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

const btnSetting = document.getElementById("btn-settings");
const popupSetting = document.getElementById("popup-setting");

btnSetting.addEventListener("click", () => {
  popupSetting.style.display = "block";
});

const closeBtnSetting = document.querySelector(".close-popup-setting");
closeBtnSetting.addEventListener("click", () => {
  popupSetting.style.display = "none";
});

const btnPlay = document.getElementById("btn-play");

btnPlay.addEventListener("click", function () {
  const fadeOutElement = document.createElement("div");
  fadeOutElement.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.2;
  transition: opacity 0.5s ease-in-out;
  `;
  document.body.appendChild(fadeOutElement);

  setTimeout(function () {
    fadeOutElement.style.opacity = 0;
    const playerName = localStorage.getItem("playerName");
    if (playerName) {
      window.location.href = "../pages/play.html";
    } else {
      window.location.href = "../pages/dangnhap.html";
    }
  }, 500);
});

const isGamePlayed = localStorage.getItem("gamePlayed");
const btnText = document.getElementById("btn-play").querySelector("p");

if (isGamePlayed) {
  btnText.textContent = "Chơi tiếp ";
}

document.getElementById("btn-play").addEventListener("click", function () {
  btnText.textContent = "Chơi tiếp";
  localStorage.setItem("gamePlayed", true);
});
