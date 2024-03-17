var points = 0;

window.onload = function () {
  if (localStorage.getItem("points")) {
    points = parseInt(localStorage.getItem("points"));
    document.getElementById("points").innerText = points;
  }
};

function savePoints() {
  localStorage.setItem("points", points);
}

// localStorage.setItem("points", 99999);