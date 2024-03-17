const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "./play.html";
});

const buttonBeeElement = document.querySelector(".cuahang-bee-buy-now");
const popupElement = document.querySelector(".popup");

buttonBeeElement.addEventListener("click", function () {
  popupElement.style.display = "block";
});

function closePopup() {
  popupElement.style.display = "none";
}

const purchasedItemsKey = "buyed-items";
function addOrUpdateProduct(purchasedItems, product) {
  const existingProductIndex = purchasedItems.findIndex(
    (item) => item.name === product.name
  );
  if (existingProductIndex !== -1) {
    purchasedItems[existingProductIndex].quantity += product.quantity;
  } else {
    purchasedItems.push(product);
  }
}

const buyButtons = document.querySelectorAll(".buy-product");
buyButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productPrice = parseInt(button.dataset.price);

    points -= productPrice;
    if (points >= 0) {
      let purchasedItems =
        JSON.parse(localStorage.getItem(purchasedItemsKey)) || [];
      const product = {
        name: button.parentNode.querySelector("p").innerText,
        quantity: 1,
      };
      addOrUpdateProduct(purchasedItems, product);
      localStorage.setItem(purchasedItemsKey, JSON.stringify(purchasedItems));
      document.getElementById("points").innerText = points;

      savePoints();
      alert("Mua thành công!");
    } else {
      alert("Bạn không đủ điểm Bee!");
    }
  });
});
