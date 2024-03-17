const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "./play.html";
});

const beePlayGame = document.querySelector(".bee-play-game p");
beePlayGame.addEventListener("click", () => {
  window.location.href = "./hocngay.html";
});

let hpBarLarval = document.querySelector(".autrung-bee-bar-container div");
let followBarHp = document.querySelector(".autrung-bee-bar span");
let popupLarval = document.querySelector(".popup-larval");
let messageBoxLarval = document.querySelector(".message-box-larval p");
// localStorage.setItem("diemTriThuc", 9999)
// localStorage.setItem("diemHocTap", 9999)
// localStorage.setItem("percent-larval", 80)

var updateBtnLarval = document.getElementById("updateLarval");
updateBtnLarval.addEventListener("click", function () {
  if (localIqTest >= 5 && localBookTest >= 5) {
    Update();
  } else {
    messageBoxLarval.style.display = "block";
    messageBoxLarval.style.background = "red";
    messageBoxLarval.style.color = "white";
    messageBoxLarval.innerHTML =
      "Không đủ điểm trí thức và học tập để nâng cấp.";
    setTimeout(() => {
      messageBoxLarval.style.display = "none";
    }, 3000);
  }
});

let textUpdateLarval = document.getElementById("updateLarval");
const localTextUpdateLarval = localStorage.getItem("text-update") || false;
const textLoadingUpdate =
  localStorage.getItem("text-loading-larval") || "Nâng cấp";
textUpdateLarval.innerHTML = textLoadingUpdate;

function Update() {
  let randomPercent = Math.floor(Math.random() * 5 + 5);
  var percentBarLarval =
    JSON.parse(localStorage.getItem("percent-larval")) || 0;
  var updateBarLaval = (percentBarLarval += randomPercent);
  localIqTest -= 5;
  localBookTest -= 5;
  localStorage.setItem("diemTriThuc", localIqTest);
  localStorage.setItem("diemHocTap", localBookTest);
  iqTest.innerHTML = localIqTest;
  bookTest.innerHTML = localBookTest;
  hpBarLarval.style.width = updateBarLaval + "%";
  localStorage.setItem("percent-larval", Number(updateBarLaval));
  followBarHp.innerHTML = `${JSON.parse(localStorage.getItem("percent-larval")) || 0
    }/100`;
  if (percentBarLarval < 100) {
    messageBoxLarval.style.display = "block";
    messageBoxLarval.style.background = "rgb(9, 204, 90)";
    messageBoxLarval.style.color = "black";
    messageBoxLarval.innerHTML = "Học thành công!!!";
    setTimeout(() => {
      messageBoxLarval.style.display = "none";
    }, 3000);
  }
  if (percentBarLarval >= 100) {
    canUpdate(percentBarLarval);
  }
}

let currentLevelLarval = document.querySelector(".larval-level span");
let larvalLevel = JSON.parse(localStorage.getItem("larval-level")) || 0;
let activeReload = true;
let beeImageLarval = document.querySelector(".autrung-bee-img img")
const assetsImageLarval = [
  "../assets/autrung/nhong.png",
  "../assets/bee/bee.gif"
]

if (larvalLevel >= 5) {
  beeImageLarval.src = assetsImageLarval[0]
}

if (larvalLevel >= 10) {
  beeImageLarval.src = assetsImageLarval[1]
}

function canUpdate(percentBarLarval) {
  if (percentBarLarval >= 100) {
    localStorage.setItem("percent-larval", 100);
    localStorage.setItem("text-loading-larval", "Tiến hóa");
    localStorage.setItem("text-update", true);
    textUpdateLarval.innerHTML = textLoadingUpdate;
    if (activeReload) {
      window.location.reload();
    }
  } else {
    localStorage.setItem("text-loading-larval", "Nâng cấp");
    textUpdateLarval.innerHTML = textLoadingUpdate;
    localStorage.setItem("percent-larval", 0);
    localStorage.setItem("text-update", false);
  }
}

textUpdateLarval.innerHTML = textLoadingUpdate;
localStorage.setItem("text-update", true);

if (textLoadingUpdate === "Tiến hóa") {
  activeReload = false;
  updateBtnLarval.addEventListener("click", function () {
    updateLarval();
  });
}


function updateLarval() {
  popupLarval.style.display = "flex";
  followBarHp.innerHTML = `${JSON.parse(localStorage.getItem("percent-larval")) || 0
    }/100`;
  hpBarLarval.style.width = `${localStorage.getItem("percent-larval") + "%"} `;
  const acceptBtnLarval = document.querySelector(".btn-popup-larval-accept");
  acceptBtnLarval.addEventListener("click", function () {
    localStorage.setItem("text-loading-larval", "Nâng cấp");
    textUpdateLarval.innerHTML = textLoadingUpdate;
    localStorage.setItem("percent-larval", 0);
    localStorage.setItem("text-update", false);
    popupLarval.style.display = "none";
    let numberCurrent = 1
    currentLevelLarval.innerHTML = larvalLevel += numberCurrent;
    if (JSON.parse(localStorage.getItem("so-luot-gieo-phan")) || 0) {
      let saveGieoPhan = (JSON.parse(localStorage.getItem("so-luot-gieo-phan")) || 0) + numberCurrent
      localStorage.setItem("so-luot-gieo-phan", saveGieoPhan)
    }
    localStorage.setItem("larval-level", larvalLevel);
    messageBoxLarval.style.display = "block";
    messageBoxLarval.style.background = "orange";
    messageBoxLarval.style.color = "black";
    messageBoxLarval.innerHTML = "Tiến hóa thành công!!!";
    setTimeout(() => {
      messageBoxLarval.style.display = "none";
      window.location.reload();
    }, 1000);
  });

  let closePopupLarval = document.querySelector(".close-popup");
  closePopupLarval.addEventListener("click", function () {
    closePopupLarvals();
  });

  function closePopupLarvals() {
    popupLarval.style.display = "none";
  }
}

currentLevelLarval.innerHTML = larvalLevel;
followBarHp.innerHTML = `${JSON.parse(localStorage.getItem("percent-larval")) || 0
  }/100`;
hpBarLarval.style.width = `${localStorage.getItem("percent-larval") + "%"} `;


const popupHuongDan = document.getElementById("bee-huong-dan")
const popupThongTin = document.getElementById("popup-huongdan")
const closePopupThongTin = document.getElementById("close-popup-huong-dan")
popupHuongDan.addEventListener("click", () => {
  popupThongTin.style.display = "block"

  closePopupThongTin.addEventListener("click", () => {
    popupThongTin.style.display = "none"
  })
})

