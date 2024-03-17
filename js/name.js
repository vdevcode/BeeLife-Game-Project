const saveName = localStorage.getItem("playerName")
console.log(saveName);
const myName = document.querySelector(".my-name span")
myName.innerHTML = saveName