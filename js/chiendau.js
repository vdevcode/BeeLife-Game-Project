const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "./xayto.html";
});

document.getElementById("batdauBtn").addEventListener("click", function () {
  document.getElementById("batdauBtn").style.display = "none";
  document.querySelector(".tan-cong-btn .actions").style.display = "block";
});

let chimangActive = false;
let khienActive = false;
let viewHp = false;
const hpKeThu = localStorage.getItem("hp-ke-thu");
const hpBee = localStorage.getItem("hp-anh-hung");

let imgKethu = document.querySelector(".ke-thu");

function playSound(soundId) {
  var sound = document.getElementById(soundId);
  sound.play();
}

document.getElementById("tancongBtn").addEventListener("click", function () {
  document.getElementById("tancongBtn").innerHTML = "Đang tấn công...";
  document.getElementById("tancongBtn").disabled = true;
  document.getElementById("tancongBtn").style.background = "red";
  document.getElementById("tancongBtn").style.color = "white";
  document.getElementById("anh-hung").classList.add("active1");
  if (chimangActive) {
    tancongKeThu(true);
    playSound("sound1");
  } else {
    tancongKeThu(false);
    playSound("sound1");
  }

  setTimeout(function () {
    document.getElementById("anh-hung").classList.remove("active1");
    document.getElementById("ke-thu").classList.add("active2");
    if ((viewHp = true)) {
      tancongBee();
    }

    playSound("sound2");

    setTimeout(function () {
      document.getElementById("ke-thu").classList.remove("active2");
      document.getElementById("tancongBtn").innerHTML = "Tấn công";
      document.getElementById("tancongBtn").style.background = "#fbcb1c";
      document.getElementById("tancongBtn").style.color = "black";
      document.getElementById("tancongBtn").disabled = false;
    }, 3000);
  }, 3000);
});

function giamMau(id, satThuong) {
  var thanhMauInner = document
    .getElementById(id)
    .querySelector(".hp-hero-inner");
  var mauHienTai = JSON.parse(localStorage.getItem(id)) || 100;
  var mau = Math.max(0, mauHienTai - satThuong);
  var phanTramMau = (mau / 100) * 100;
  thanhMauInner.style.width = phanTramMau + "%";
  thanhMauInner.innerHTML = mau + "/100";
  localStorage.setItem(id, mau);

  if (mau === 0) {
    if (id === "hp-anh-hung") {
      document.getElementById("anh-hung").classList.remove("active1");
      alert("Bạn đã thua cmnr!");
      return;
    } else if (id === "hp-ke-thu") {
      document.getElementById("ke-thu").classList.remove("active2");
      imgKethu.src = "../assets/dead/dead.png";
      imgKethu.style.height = "100px";
      imgKethu.style.filter = "none";
      imgKethu.style.transform = "scaleX(1)";
      alert("Bạn đã chiến thắng, bảo vệ tổ thành cong!");
      return;
    }
  }
}

const messageTriLuc = document.querySelector(".message-point-tri-luc");
const messagePointTriLuc = document.querySelector(".message-point-tri-luc p");

function tancongKeThu(chiMangActive) {
  var satThuong = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  if (chiMangActive) {
    satThuong *= 2;
    chimangActive = false; //sau do tat di vi chi dung dc 1 luot
  }
  //random -> 0.1 - 1
  //ti le 50%
  if (Math.round(Math.random()) >= 1) {
    const pointDiemTri = 1;
    const pointDiemLuc = Math.round(Math.random() + 2);
    diemTri += pointDiemTri;
    diemLuc += pointDiemLuc;
    messageTriLuc.style.display = "block";
    messagePointTriLuc.innerHTML = `Bạn nhận được ${pointDiemTri} "Trí" và ${pointDiemLuc} "Lực"`;
    localStorage.setItem("diem-tri", diemTri);
    localStorage.setItem("diem-luc", diemLuc);
    increaseDiemTri.innerHTML = diemTri;
    increaseDiemLuc.innerHTML = diemLuc;
    setTimeout(() => {
      messageTriLuc.style.display = "none";
    }, 3000);
  } else {
  }
  giamMau("hp-ke-thu", satThuong);
}

function tancongBee() {
  var satThuong = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  giamMau("hp-anh-hung", satThuong);
}

let currentHp = localStorage.getItem("currentHp");
document.getElementById("dauhangBtn").addEventListener("click", function () {
  var xacNhan = confirm(
    "Nếu đầu hàng, tổ ong của bạn sẽ bị mất đi 20 máu, bạn đồng ý không?"
  );
  if (xacNhan) {
    localStorage.setItem("hp-anh-hung", 100);
    localStorage.setItem("hp-ke-thu", 100);
    currentHp -= 20;
    localStorage.setItem("currentHp", currentHp);
    alert(`Bạn đã đầu hàng thành công, máu tổ ong hiện tại: ${currentHp}`);
    window.location.reload();
  } else {
  }
});

const hpToOng = document.querySelector(".hp-to-ong span");
hpToOng.innerHTML = currentHp;

if (localStorage.getItem("currentHp") > 400) {
  hpToOng.style.color = "green";
} else if (
  localStorage.getItem("currentHp") <= 400 &&
  localStorage.getItem("currentHp") >= 200
) {
  hpToOng.style.color = "orange";
} else if (localStorage.getItem("currentHp") < 200) {
  hpToOng.style.color = "red";
}

function updateCurrentDate() {
  var currentDate = new Date().toLocaleDateString();
  var storedDate = localStorage.getItem("chimangDate");

  if (currentDate !== storedDate) {
    localStorage.setItem("chimangDate", currentDate);
    localStorage.setItem("chimangCount", 0);
  }
}

document
  .getElementById("itemChiMangIconBtn")
  .addEventListener("click", function () {
    const showMessage = document.querySelector(".thong-bao-items p");
    updateCurrentDate();
    var chimangCount = parseInt(localStorage.getItem("chimangCount")) || 0;
    if (chimangCount < 2) {
      showMessage.style.display = "block";
      showMessage.style.background = "rgb(9, 204, 90)";

      showMessage.innerHTML =
        "Bạn đã dùng x2 chí mạng, sát thương dc x2 trong 1 lượt!!";
      chimangCount++;
      localStorage.setItem("chimangCount", chimangCount);

      document.getElementById("itemChiMangIconBtn").disabled = true;
      chimangActive = true;
      setTimeout(() => {
        showMessage.style.display = "none";
        document.getElementById("itemChiMangIconBtn").disabled = false;
      }, 3000);
    } else {
      showMessage.style.display = "block";
      showMessage.style.background = "red";
      showMessage.style.color = "white";
      showMessage.innerHTML = "Bạn dùng hết lượt rồi, chờ ngày mai đi!!";
      document.getElementById("itemChiMangIconBtn").disabled = true;

      setTimeout(() => {
        showMessage.style.display = "none";
        document.getElementById("itemChiMangIconBtn").disabled = false;
      }, 3000);
    }
  });

const nameChienDau = document.querySelector("#anh-hung p");
nameChienDau.innerHTML = localStorage.getItem("playerName");

localStorage.setItem("hp-anh-hung", 10);
localStorage.setItem("hp-ke-thu", 10);
