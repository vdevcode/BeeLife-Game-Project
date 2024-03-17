const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "./play.html";
});

const today = new Date().toLocaleDateString();
const storedDate = localStorage.getItem("diemDanhDate");

const diemDanhDaily1 = document.getElementById("form-diemdanh-sub-daily1");
const diemDanhPopup = document.getElementById("diemdanh-popup");

var thuocDo = localStorage.getItem("thuoc_1");
var thuocXanh = localStorage.getItem("thuoc_2");
var thuocTim = localStorage.getItem("thuoc_3");

diemDanhDaily1.addEventListener("click", function () {
  if (storedDate === today) {
    alert("Bạn đã điểm danh hôm nay rồi, vui lòng quay lại vào ngày mai!");
  } else {
    showPopup(`Chúc mừng bạn đã nhận được 5 điểm!`, 5);
    points += 5;
    diemTri += 3;
    diemLuc += 2;
    thuocDo += 1;
    thuocXanh += 1;
    thuocTim += 2;
    diemDanhDaily1.classList.add("diem-danh-thanh-cong");
    localStorage.setItem("diem-tri", diemTri);
    localStorage.setItem("diem-luc", diemLuc);
    localStorage.setItem("thuoc_1", thuocDo);
    localStorage.setItem("thuoc_2", thuocXanh);
    localStorage.setItem("thuoc_3", thuocTim);

    increaseDiemTri.innerHTML = diemTri;
    increaseDiemLuc.innerHTML = diemLuc;
    savePoints();
    document.getElementById("points").innerText = points;
    localStorage.setItem("diemDanhDate", today);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }
});

function showPopup() {
  diemDanhPopup.style.display = "block";
}

function closePopup() {
  diemDanhPopup.style.display = "none";
}
// localStorage.clear(storedDate)
