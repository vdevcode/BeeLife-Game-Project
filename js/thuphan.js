const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "./play.html";
});

const gieoPhanBtn = document.getElementById("gieo-phan-btn");
const countGieoPhan = document.querySelector(".count-gieo-phan span");
const beeFlower = document.querySelector(".bee-flower");
let larvalLevel = JSON.parse(localStorage.getItem("larval-level")) || 0;
let dailyGieoPhanAttempts = 0;
var showMessageGieoPhan = document.querySelector(".show-message-gieo-phan");

const currentDate = new Date().toLocaleDateString();
let storedDate = localStorage.getItem("gieo-phan-date");

if (storedDate !== currentDate) {
  dailyGieoPhanAttempts = 3 + larvalLevel;
  localStorage.setItem("gieo-phan-date", currentDate);
  localStorage.setItem("so-luot-gieo-phan", dailyGieoPhanAttempts);
}

countGieoPhan.innerText = Number(localStorage.getItem("so-luot-gieo-phan"));
gieoPhanBtn.addEventListener("click", function () {
  if (Number(localStorage.getItem("so-luot-gieo-phan")) > 0) {
    if (dailyGieoPhanAttempts >= 0) {
      gieoPhanBtn.innerText = `Đang gieo phấn...`;
      gieoPhanBtn.style.background = "red";
      gieoPhanBtn.style.color = "white";
      gieoPhanBtn.style.height = "44px";
      const randomX = Math.floor(Math.random() * 200);
      beeFlower.style.animation = `bee-fly ${randomX}s linear`;
      const score = Math.floor(Math.random() * 5) + 1;
      setTimeout(() => {
        gieoPhanBtn.innerText = "Đi gieo phấn";
        gieoPhanBtn.style.background = "#fbcb1c";
        gieoPhanBtn.style.color = "black";
        gieoPhanBtn.disabled = false;
        showMessageGieoPhan.style.display = "flex";
        showMessageGieoPhan.style.background = "rgb(9, 204, 90)";
        points += score;
        document.getElementById("points").innerText = points;
        diemTri += 1;
        localStorage.setItem("diem-tri", diemTri);
        savePoints();
        increaseDiemTri.innerHTML = diemTri;
        showMessageGieoPhan.innerHTML = `Bee đã gieo phấn thành công và được ${score} bee và ${1} điểm "trí" !!`;
        dailyGieoPhanAttempts--;
        localStorage.setItem("so-luot-gieo-phan", dailyGieoPhanAttempts);
        countGieoPhan.innerText = Number(
          localStorage.getItem("so-luot-gieo-phan")
        );
        setTimeout(() => {
          showMessageGieoPhan.style.display = "none";
        }, 3000);
      }, randomX * 100);
    }
  } else {
    showMessageGieoPhan.style.display = "flex";
    showMessageGieoPhan.style.background = "red";
    showMessageGieoPhan.style.color = "white";

    showMessageGieoPhan.innerHTML =
      "Hôm nay bạn đã hết lượt gieo phấn. Hãy dùng vé để gieo thêm!";
    setTimeout(() => {
      showMessageGieoPhan.style.display = "none";
    }, 3000);
  }
});

dailyGieoPhanAttempts = (parseInt(localStorage.getItem("so-luot-gieo-phan")) || 0)
localStorage.setItem("so-luot-gieo-phan", dailyGieoPhanAttempts);

const defaultValues = {
  1: 0,
  2: 0,
  3: 0,
};

for (const key in defaultValues) {
  if (!localStorage.getItem(`thuoc_${key}`)) {
    localStorage.setItem(`thuoc_${key}`, defaultValues[key]);
  }
}

const popup = document.querySelector(".popup");
const popupImg = document.querySelector(".popup-img");
const closeBtn = document.querySelector(".close-popup");
const images = document.querySelectorAll(".thuphan-sub-items img");

images.forEach((image) => {
  image.addEventListener("click", function () {
    const beeImageElement = beeFlower.querySelector("img");
    const currentClass = beeImageElement.classList.value;
    const thuocQuantity = parseInt(
      localStorage.getItem(`thuoc_${image.dataset.id}`)
    );

    if (thuocQuantity > 0) {
      if (currentClass.includes("bee-drop")) {
        beeImageElement.classList.replace(
          currentClass,
          `bee-drop${image.dataset.id}`
        );
      } else {
        beeImageElement.classList.add(`bee-drop${image.dataset.id}`);
      }

      popup.style.display = "block";
      popupImg.src = image.src;
      let randomPoints;
      const minPoints = parseInt(image.dataset.minPoint);
      const maxPoints = parseInt(image.dataset.maxPoint);
      randomPoints =
        Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints;
      const popupContent = document.querySelector(".popup-content");
      popupContent.innerHTML = `Bạn đã sử dụng ${image.alt} và nhận được ${randomPoints} điểm!`;
      points += randomPoints;
      savePoints();
      document.getElementById("points").innerText = points;

      localStorage.setItem(`thuoc_${image.dataset.id}`, thuocQuantity - 1);
    } else {
      showMessageGieoPhan.style.display = "flex";
      showMessageGieoPhan.style.background = "red";
      showMessageGieoPhan.innerHTML =
        "Số lượng thuốc hết rồi, mua hoặc nhận quà để có đi nhé!!!";
      setTimeout(() => {
        showMessageGieoPhan.style.display = "none";
      }, 2000);
    }
  });
});

closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
});
