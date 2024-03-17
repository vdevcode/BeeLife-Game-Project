const backgroundAudio = document.querySelector(".popup-setting-des-audio");

  if (typeof popupSetting !== "undefined") {
    backgroundAudio.style.display = "flex";
  } else {
    backgroundAudio.style.display = "none";
  }

document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("myAudio");
  var toggleButton = document.getElementById("toggleAudio");
  var volumeControl = document.getElementById("volumeControl");
  var isAudioPlaying = localStorage.getItem("isAudioPlaying");
  var audioVolume = localStorage.getItem("audioVolume");
  const volumeControlNumber = document.querySelector(".volumeControlNumber")

  //bat nhac khi vao game
  if (isAudioPlaying === null) {
    isAudioPlaying = false;
    localStorage.setItem("isAudioPlaying", "false");
  }

  if (audioVolume === null) {
    audioVolume = 50;
    localStorage.setItem("audioVolume", audioVolume);
  }

  audio.volume = audioVolume / 100;
  audio.controls = false;

  if (isAudioPlaying === "true") {
    audio.play().catch(function (error) {
      console.error("Lỗi phát nhac audio:", error.message);
    });
  }

  updateToggleButtonState();

  toggleButton.addEventListener("click", function () {
    if (audio.paused) {
      audio.play().catch(function (error) {
        console.error("Lỗi phát nhac audio :", error.message);
      });
      localStorage.setItem("isAudioPlaying", "true");
    } else {
      audio.pause();
      localStorage.setItem("isAudioPlaying", "false");
    }

    updateToggleButtonState();
  });

  volumeControl.addEventListener("input", function () {
    audio.volume = volumeControl.value / 100;
    localStorage.setItem("audioVolume", volumeControl.value);
    volumeControlNumber.innerText = `Âm lượng: ${Math.round((audio.volume * 100))}`
  });

  
  // if(typeof volumeControlNumber === "null"){
  //   volumeControlNumber === null
  // }
  // else{
  //   volumeControlNumber.innerText = `Âm lượng: ${Math.round((audio.volume * 100))}`

  // }

  function updateToggleButtonState() {
    toggleButton.textContent = audio.paused ? "Bật nhạc" : "Tắt nhạc";
  }

  // Bắt sự kiện khi âm thanh kết thúc và bắt đầu lại
  audio.addEventListener("ended", function () {
    if (isAudioPlaying === "true") {
      audio.play().catch(function (error) {
        console.error("Lỗi phát nhac audio:", error.message);
      });
    }
  });
});
