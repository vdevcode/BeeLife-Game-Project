const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "./play.html";
});

var upgradeMessageErrorDiv = document.getElementById("upgradeMessageError");

document.addEventListener("DOMContentLoaded", function () {
  checkUpgradeAvailability();
  document
    .getElementById("upgradeButton")
    .addEventListener("click", function () {
      if (canUpgrade()) {
        upgrade();
      } else {
        upgradeMessageErrorDiv.style.display = "flex";
        upgradeMessageErrorDiv.innerHTML = "Không đủ items để nâng cấp!!";

        setTimeout(function () {
          upgradeMessageErrorDiv.style.display = "none";
        }, 3000);
      }
    });
});


function canUpgrade() {
  var buyedItems = JSON.parse(localStorage.getItem("buyed-items"));
  var currentLevel = JSON.parse(localStorage.getItem("current-level")) || 0;

  if (!buyedItems) {
    return false;
  }
  var requiredItemsKey = "required-items-level-" + currentLevel;
  var requiredItems = JSON.parse(localStorage.getItem(requiredItemsKey));

  if (!requiredItems) {
    requiredItems = [
      { name: "Đất sét", quantity: 3 },
      { name: "Sáp ong", quantity: 2 },
      { name: "Nhựa", quantity: 2 },
      { name: "Que gỗ", quantity: 1 },
    ];
  }

  localStorage.setItem(requiredItemsKey, JSON.stringify(requiredItems));

  for (var i = 0; i < requiredItems.length; i++) {
    var requiredItem = requiredItems[i];
    if (buyedItems) {
      var boughtItem = buyedItems.find(
        (item) => item.name === requiredItem.name
      );
      if (!boughtItem || boughtItem.quantity < requiredItem.quantity) {
        return false;
      }
    }
  }

  return true;
}

let hp = 500
let hpNow = JSON.parse(localStorage.getItem("hp-level-now")) || 0

function upgrade() {
  var buyedItems = JSON.parse(localStorage.getItem("buyed-items"));
  var currentLevel = JSON.parse(localStorage.getItem("current-level")) || 0;
  var requiredItemsKey = "required-items-level-" + currentLevel;
  var requiredItems = JSON.parse(localStorage.getItem(requiredItemsKey));

  if (!requiredItems) {
    requiredItems = [
      { name: "Đất sét", quantity: 3 },
      { name: "Sáp ong", quantity: 2 },
      { name: "Nhựa", quantity: 2 },
      { name: "Que gỗ", quantity: 1 },
    ];
  }

  for (var i = 0; i < requiredItems.length; i++) {
    var requiredItem = requiredItems[i];
    var boughtItem = buyedItems.find((item) => item.name === requiredItem.name);
    boughtItem.quantity -= requiredItem.quantity;
  }
  localStorage.setItem("buyed-items", JSON.stringify(buyedItems));
  updateLevel();
  saveNextLevelInfo();
  checkUpgradeAvailability();
  upgradeMessageErrorDiv.style.display = "flex";
  upgradeMessageErrorDiv.style.background = "rgb(9, 204, 90)";
  upgradeMessageErrorDiv.innerHTML = "Bạn đã nâng cấp thành công!!";
  hpNow += 50
  localStorage.setItem("hp-level-now", (hpNow + hp))
  localStorage.getItem("hp-level-now")
  setTimeout(function () {
    upgradeMessageErrorDiv.style.display = "none";
  }, 3000);
  displayCurrentLevel();
}
function checkUpgradeAvailability() {
  // var buyedItems = JSON.parse(localStorage.getItem("buyed-items"));
  var currentLevel = JSON.parse(localStorage.getItem("current-level")) || 0;
  var requiredItemsKey = "required-items-level-" + currentLevel;
  var requiredItems = JSON.parse(localStorage.getItem(requiredItemsKey));
  if (!requiredItems) {
    requiredItems = [
      { name: "Đất sét", quantity: 3 },
      { name: "Sáp ong", quantity: 2 },
      { name: "Nhựa", quantity: 2 },
      { name: "Que gỗ", quantity: 1 },
    ];
  }
}

function displayCurrentLevel() {
  saveCurrentLevel();
  const currentLevelStorage = localStorage.getItem("current-level") || 0;
  function LevelNext() {
    document.querySelector("#upgradeButton span").innerText =
      Number(currentLevelStorage) + 1;
  }
  LevelNext();
}
displayCurrentLevel();

function saveCurrentLevel() {
  const currentLevelStorage = localStorage.getItem("current-level");
  if (currentLevelStorage) {
    document.getElementById("current-level").innerText =
      "Cấp độ hiện tại: " + currentLevelStorage;
  } else {
    document.getElementById("current-level").innerText =
      "Cấp độ hiện tại: " + 0;
  }
}

function updateLevel() {
  var currentLevel = calculateCurrentLevel();
  localStorage.setItem("current-level", JSON.stringify(currentLevel));
  displayCurrentLevel();
}

function calculateCurrentLevel() {
  var buyedItems = JSON.parse(localStorage.getItem("buyed-items"));
  var totalQuantity = buyedItems.reduce((sum, item) => sum + item.quantity, 0);
  var currentLevel = Math.floor(totalQuantity / 100) + 1;
  return currentLevel;
}

function saveNextLevelInfo() {
  var currentLevel = JSON.parse(localStorage.getItem("current-level")) || 0;
  var nextLevel = currentLevel + 1;
  var nextLevelKey = "required-items-level-" + nextLevel;
  var nextLevelItems = [
    { name: "Đất sét", quantity: 4 },
    { name: "Nhựa", quantity: 2 },
  ];

  localStorage.setItem(nextLevelKey, JSON.stringify(nextLevelItems));
}

var protectButton = document.getElementById("protectButton");
var protectTime = 0;
var protectInterval;
var protectTimeElement = document.getElementById("protect-time");
var points = parseInt(localStorage.getItem("points")) || 0;
var isProtectActive = false;
var soundProtect = document.getElementById("sound-protect")

protectButton.addEventListener("click", function () {
  var toOngImageBee = document.querySelector(".to-ong-image-bee");
  toOngImageBee.classList.toggle("protect");
  savePoints();

  if (toOngImageBee.classList.contains("protect")) {
    isProtectActive = true;

    protectButton.textContent = "Huỷ khiên";
    protectButton.style.background = "red";
    protectButton.style.color = "white";
    if (points > 0) {
      protectInterval = setInterval(function () {
        protectTime += 1;
        updateProtectTime();
        if (protectTime % 10 === 0) {
          updatePoints();
        }
        if (points <= 0) {
          upgradeMessageErrorDiv.style.display = "block";

          upgradeMessageErrorDiv.innerHTML =
            "Bạn không đủ điểm Bee rồi, thăm ngàn đi.";
          clearInterval(protectInterval);
          toOngImageBee.classList.remove("protect");
          protectButton.textContent = "Khiên bảo vệ";
          protectButton.style.background = "#fbcb1c";
          protectButton.style.color = "black";
          protectTimeElement.style.display = "none";
          isProtectActive = false;
        }
        else {
          soundProtect.play()
        }
      }, 1000);
    } else {
      upgradeMessageErrorDiv.style.display = "block";

      upgradeMessageErrorDiv.innerHTML =
        "Bạn không đủ điểm Bee rồi, thăm ngàn đi.";

      toOngImageBee.classList.remove("protect");
      protectButton.textContent = "Khiên bảo vệ";
      protectButton.style.background = "#fbcb1c";
      protectButton.style.color = "black";
      protectTimeElement.style.display = "none";
      isProtectActive = false;
      return false;
    }
    protectTimeElement.style.display = "block";
    savePoints();
  } else {
    protectButton.textContent = "Khiên bảo vệ";
    protectButton.style.background = "#fbcb1c";
    protectButton.style.color = "black";
    clearInterval(protectInterval);
    protectTimeElement.style.display = "none";
    soundProtect.pause()
  }
});

function updateProtectTime() {
  document.getElementById("protect-time").innerText =
    "Thời gian khiên bảo vệ: " + protectTime + "s";
}

function updatePoints() {
  if (points > 0) {
    points -= 1;
    savePoints();
    document.getElementById("points").innerText = points;
  }
}


let popup4 = document.querySelector(".up-items-level");
const showPopup4 = document.getElementById("popup-item");

popup4.addEventListener("click", function () {
  showPopup4.style.display = "block";
  var buyedItems = localStorage.getItem("required-items-level-" + 0);
  if (buyedItems) {
    var items = JSON.parse(buyedItems) ;
    var itemListDiv = document.getElementById("item-list");
    itemListDiv.innerHTML = "<ul>";
    items.forEach(function (item) {
      itemListDiv.innerHTML +=
        "<li>" + item.name + " - Số lượng: " + item.quantity + "</li>";
    });
    itemListDiv.innerHTML += "</ul>";
  }
});

function hidePopup() {
  showPopup4.style.display = "none";
}

function chienDau() {
  window.location.href = "chiendau.html";
}
