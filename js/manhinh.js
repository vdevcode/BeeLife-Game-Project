window.onload = function() {
    var screenWidth = window.innerWidth;
    var gameContainer = document.body

    if (screenWidth > 468) {
        gameContainer.style.display = "none";
        alert("Chỉ có thể chơi trên điện thoại di động.");
    } else {
        gameContainer.style.display = "block";
    }
};

