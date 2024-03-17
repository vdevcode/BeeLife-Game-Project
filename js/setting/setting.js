document.addEventListener("DOMContentLoaded", function () {
  const savedImage = localStorage.getItem("selectedBackground");

  if (savedImage) {
    document.body.style.backgroundImage = `url(${savedImage})`;
    const selectedImageElement = document.querySelector(
      `.popup-setting-des-img img[src='${savedImage}']`
    );
    if (selectedImageElement) {
      selectedImageElement.classList.add("active");
    }
  }

  const popupSettingDesImg = document.querySelector(".popup-setting-des-img");
  if (popupSettingDesImg) {
    popupSettingDesImg.addEventListener("click", function (event) {
      if (event.target.tagName === "IMG") {
        const selectedImage = event.target.src;
        document.body.style.backgroundImage = `url(${selectedImage})`;
        document
          .querySelectorAll(".popup-setting-des-img img")
          .forEach((img) => img.classList.remove("active"));
        event.target.classList.add("active");
        localStorage.setItem("selectedBackground", selectedImage);
      }
    });
  }
});

//doi mau color
document.addEventListener("DOMContentLoaded", function () {
  const savedColor = localStorage.getItem("selectedColor");
  if (savedColor) {
    applyColor(savedColor);
  }
  const popupSettingDesButton = document.querySelector(
    ".popup-setting-des-button"
  );
  if (popupSettingDesButton) {
    popupSettingDesButton.addEventListener("click", function (event) {
      if (event.target.classList.contains("popup-setting-des-sub-button")) {
        const selectedColor = getComputedStyle(event.target).backgroundColor;

        applyColor(selectedColor);
        document
          .querySelectorAll(".popup-setting-des-sub-button")
          .forEach((button) => button.classList.remove("active"));
        event.target.classList.add("active");
        localStorage.setItem("selectedColor", selectedColor);
      }
    });
  }
});

function applyColor(color) {
  document.documentElement.style.setProperty("--main-color", color);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTextColor = localStorage.getItem("selectedTextColor");
  if (savedTextColor) {
    applyTextColor(savedTextColor);
  }

  const popupSettingDesText = document.querySelector(".popup-setting-des-text");

  if (popupSettingDesText) {
    popupSettingDesText.addEventListener("click", function (event) {
      if (event.target.classList.contains("popup-setting-des-sub-text")) {
        const selectedTextColor = getComputedStyle(event.target).color;

        applyTextColor(selectedTextColor);
        document
          .querySelectorAll(".popup-setting-des-sub-text")
          .forEach((text) => text.classList.remove("active"));
        event.target.classList.add("active");
        localStorage.setItem("selectedTextColor", selectedTextColor);
      }
    });
  }
});

function applyTextColor(color) {
  document.documentElement.style.setProperty("--main-text-color", color);
}
