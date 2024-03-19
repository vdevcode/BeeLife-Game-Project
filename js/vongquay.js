const btnVongQuay = document.querySelector(".vong-quay");
const popupVongQuay = document.getElementById("popup-vongquay");
const closePopupVongQuay = document.querySelector(".close-popup-vongquay");
btnVongQuay.addEventListener("click", function () {
  popupVongQuay.style.display = "flex";

  closePopupVongQuay.addEventListener("click", () => {
    popupVongQuay.style.display = "none";
  });
});
let container = document.querySelector(".container-vongquay");
let btnSpin = document.getElementById("spin");
let number = Math.ceil(Math.random() * 10000);
let stoperPosition = 0;
const messageVongQuay = document.querySelector(".message-vongquay p");
const phaoHoa = document.querySelector(".phao-hoa-vong-quay");
const bloon = document.querySelector(".bong-bong-vong-quay");

let flash = document.querySelector(".container-vongquay div");
btnSpin.disabled = false;
btnSpin.addEventListener("click", () => {
  btnSpin.disabled = true;
  btnSpin.innerHTML = "Đang quay, chờ đi....";
  container.style.transition = "transform 5s ease-in-out";
  container.style.transform = "rotate(" + number + "deg)";
  number += Math.ceil(Math.random() * 10000);

  setTimeout(() => {
    let rotation = (number - 30) % 360;
    if (rotation < 0) rotation += 360;
    stoperPosition = Math.ceil(rotation / 60);
    if (stoperPosition === 7) stoperPosition = 1;
    let prize = document.querySelector(
      ".container-vongquay div:nth-child(" + stoperPosition + ")"
    );
    let prizeText = "";
    if (stoperPosition === 1) {
      prizeText = "Bee x2";
      points *= 2;
      document.getElementById("points").innerText = points;
      savePoints();
    } else if (stoperPosition === 2) {
      prizeText = "Bee x3";
      points *= 3;
      document.getElementById("points").innerText = points;
      savePoints();
    } else if (stoperPosition === 3) {
      prizeText = "Thuốc sức mạnh Đỏ x1";
      let thuoc1 = JSON.parse(localStorage.getItem("thuoc_1)") || 0);
      thuoc1 += 1;
      localStorage.setItem("thuoc_1", thuoc1);
    } else if (stoperPosition === 4) {
      prizeText = "Thuốc sức mạnh Tím x2";
      let thuoc3 = JSON.parse(localStorage.getItem("thuoc_3)") || 0);
      thuoc3 += 2;
      localStorage.setItem("thuoc_3", thuoc3);
    } else if (stoperPosition === 5) {
      prizeText = "Cái nịt";
    } else if (stoperPosition === 6) {
      prizeText = "3 'Trí' và 2 'Lực";
      let diemTri = JSON.parse(localStorage.getItem("diem-tri") || 0);
      diemTri += 3;
      increaseDiemTri.innerHTML = diemTri;

      let diemLuc = JSON.parse(localStorage.getItem("diem-luc") || 0);
      diemLuc += 2;
      increaseDiemLuc.innerHTML = diemLuc;

      localStorage.setItem("diem-tri", diemTri);
      localStorage.setItem("diem-luc", diemLuc);
    } else {
      prizeText = prize.innerText;
    }
    messageVongQuay.style.display = "block";
    phaoHoa.style.display = "block";
    bloon.style.display = "block";
    messageVongQuay.innerHTML =
      "Bạn nhận được: " + prizeText + "" + ", Chúc mừng nhé!!!";
    btnSpin.disabled = false;
    btnSpin.innerHTML = "Bắt đầu quay";

    setTimeout(() => {
      messageVongQuay.style.display = "none";
      phaoHoa.style.display = "none";
      bloon.style.display = "none";
    }, 3000);
  }, 5000);
});
