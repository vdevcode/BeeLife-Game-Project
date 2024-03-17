const openBag = document.getElementById("bag-thu-phan");
const popupBag = document.getElementById("popupBag");

openBag.addEventListener("click", () => {
  popupBag.style.display = "block";
  soundBagPlay()
});

const closeBtn1 = document.querySelector(".close-popup1");

closeBtn1.addEventListener("click", () => {
  popupBag.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const purchasedItems = JSON.parse(localStorage.getItem("buyed-items"))
  let productListElement = document.getElementById("productList1");

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
});
