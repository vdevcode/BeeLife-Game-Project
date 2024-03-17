let iqTest = document.querySelector(".bee-brain-iq span");
let localIqTest = JSON.parse(localStorage.getItem("diemTriThuc")) || 0;
iqTest.innerHTML = localIqTest;
let bookTest = document.querySelector(".bee-book-iq span");
let localBookTest = JSON.parse(localStorage.getItem("diemHocTap")) || 0;
bookTest.innerHTML = localBookTest;