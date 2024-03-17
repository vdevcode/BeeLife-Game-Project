const btnThanhTich = document.querySelector(".bee-thanh-tich ");
const popupThanhTich = document.getElementById("popup-thanhtich");
btnThanhTich.addEventListener("click", () => {
  popupThanhTich.style.display = "block";
  const closePopupThanhTich = document.querySelector(".close-popup-thanh-tich");
  closePopupThanhTich.addEventListener("click", () => {
    popupThanhTich.style.display = "none";
  });
});

var diemTri = JSON.parse(localStorage.getItem("diem-tri")) || 0;
var diemLuc = JSON.parse(localStorage.getItem("diem-luc")) || 0;

const showThanhTich = document.querySelector(".khen-thuong");
if (diemTri >= 50 || diemLuc >= 50) {
  btnThanhTich.style.display = "block";

  const alreadyShown = localStorage.getItem("alreadyShown");
  if (!alreadyShown) {
    showThanhTich.style.display = "flex";
    localStorage.setItem("alreadyShown", true);
    setTimeout(() => {
      showThanhTich.style.display = "none";
    }, 5000);
  }
} else {
  // console.log("k du diem");
}
if (btnThanhTich !== "undefined") {
  if (diemTri >= 50 || diemLuc >= 50) {
    btnThanhTich.style.display = "block";
  } else {
  }
}

const showNameCongratu = document.querySelector(".popup-thanhtich-giay-khen p");
showNameCongratu.innerHTML =
  "Xin chúc mừng: " + localStorage.getItem("playerName");

// localStorage.setItem("diem-luc", 50)
// localStorage.setItem("diem-tri", 0)
