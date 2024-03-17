var diemTri = JSON.parse(localStorage.getItem("diem-tri")) || 0
var diemLuc = JSON.parse(localStorage.getItem("diem-luc")) || 0

const increaseDiemTri = document.querySelector(".bee-diem-tri p");
const increaseDiemLuc = document.querySelector(".bee-diem-luc p");

increaseDiemTri.innerHTML = diemTri;
increaseDiemLuc.innerHTML = diemLuc;
