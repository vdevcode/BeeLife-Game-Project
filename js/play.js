const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// hái mạt ong bằng cách chs xếp hình
const honeyBee = document.querySelector(".honey-bee");

honeyBee.addEventListener("click", () => {
  window.location.href = "./laymat.html";
});

// điểm danh
const diemDanhBee = document.querySelector(".diemdanh-bee");

diemDanhBee.addEventListener("click", () => {
  window.location.href = "./diemdanh.html";
});

//thụ phấn
const thuphanBee = document.querySelector(".thuphan-bee");

thuphanBee.addEventListener("click", () => {
  window.location.href = "./thuphan.html";
});

//cua hàng
const cuahangBee = document.querySelector(".cuahang-bee");

cuahangBee.addEventListener("click", () => {
  window.location.href = "./cuahang.html";
});

//xay tổ
const xaytoBee = document.querySelector(".xayto-bee");

xaytoBee.addEventListener("click", () => {
  window.location.href = "./xayto.html";
});

//autrung
const autrungBee = document.querySelector(".autrung-bee");

autrungBee.addEventListener("click", () => {
  window.location.href = "./autrung.html";
});


const openBag = document.getElementById("bag");
const popupBag = document.getElementById("popupBag");


openBag.addEventListener("click", () => {
  popupBag.style.display = "block";
  soundBagPlay()
});

const closeBtn = document.querySelector(".close-popup");

closeBtn.addEventListener("click", () => {
  popupBag.style.display = "none";
});

const purchasedItems = JSON.parse(localStorage.getItem("buyed-items"));
const productListElement = document.getElementById("productList");

if(purchasedItems){

purchasedItems.forEach((product) => {
  const productItemElement = document.createElement("li");
  productItemElement.innerText = `${product.name} x${product.quantity}`;
  productListElement.appendChild(productItemElement);
});
}
else{
  productListElement.innerHTML = "Không có vật phẩm!!!"
}