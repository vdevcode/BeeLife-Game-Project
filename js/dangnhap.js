document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const playerNameInput = document.getElementById("player-name");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const playerName = playerNameInput.value.trim();

    if (playerName === "") {
      errorMessage.textContent = "Chưa nhập tên mà đòi vào game??";
      return; 
    }

    if (!validateName(playerName)) {
      return; 
    }

    errorMessage.textContent = `Tạo tên ${playerName} thành công, đang vào thế giới bee!!!`;
    errorMessage.style.color = 'green';
    localStorage.setItem("playerName", playerName);

    setTimeout(() => {
      window.location.href = "../pages/play.html";
    }, 1000);
  });

  function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(name)) {
      errorMessage.textContent = "Tên không dùng dấu hoặc số bạn nhé!!!";
      return false;
    } else if (name.length < 6) {
      errorMessage.textContent = "Tên phải dài hơn 5 ký tự. Vui lòng nhập lại.";
      playerNameInput.focus();
      return false;
    }
    return true;
  }

  const backButton = document.querySelector(".back-btn");

  backButton.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});
