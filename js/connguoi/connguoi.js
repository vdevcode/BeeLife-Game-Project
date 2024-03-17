const currentHpElement = document.getElementById("hp-value");
const currentHpBarElement = document.getElementById("hp-bar");

if (localStorage.getItem("currentHp") > 400) {
  currentHpBarElement.style.background = "rgb(9, 204, 90)"
  currentHpElement.style.color = "black"
}
else if (localStorage.getItem("currentHp") >= 200 && localStorage.getItem("currentHp") <= 400) {
  currentHpBarElement.style.background = "orange"
  currentHpElement.style.color = "black"
}
else if (localStorage.getItem("currentHp") < 200) {
  currentHpBarElement.style.background = "red"

}

function showAttackPopup(damage) {
  const attackPopup = document.getElementById("attack-popup");
  const damageValue = document.getElementById("damage-value");

  damageValue.textContent = damage;
  attackPopup.style.display = "flex";

  setTimeout(function () {
    attackPopup.style.display = "none";
  }, 4000);
}


function takeDamage() {
  const damage = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
  const currentHp = parseInt(currentHpElement.textContent);
  const newHp = currentHp - damage;
  if (newHp >= 10) {
    currentHpElement.textContent = newHp;
    if (localStorage.setItem("currentHp", newHp)) {
      localStorage.setItem("currentHp", newHp);
    }
    updateHpBar(newHp);
    showAttackPopup(damage);
  } else {
    alert(`Tổ của bạn sắp sập cmnr. thăm ngàn nâng cấp lên`);
    return false;
  }
}
localStorage.getItem("hp-level-now")

function updateHpBar(newHp) {
  const maxHp = (JSON.parse(localStorage.getItem("hp-level-now") || 500));
  const percentage = (newHp / maxHp) * 100;
  currentHpBarElement.style.width = `${percentage}%`;
}

function monsterAttack() {
  if (isProtectActive !== true) {
    //  nếu k bật khiên bảo ve
    takeDamage();
  }
  const randomTime = Math.floor(Math.random() * (360000 - 10000 + 1)) + 40000;
  setTimeout(monsterAttack, randomTime);
}

const savedHp = localStorage.getItem("currentHp");

if (savedHp) {
  currentHpElement.textContent = savedHp;
  updateHpBar(savedHp);
}

if (savedHp >= 10) {
  setTimeout(() => {
    monsterAttack()
  }, 3000)
}



if (localStorage.getItem("currentHp")) {

}
else {
  localStorage.setItem("currentHp", hp)
  window.location.reload()
}