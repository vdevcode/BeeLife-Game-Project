const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {
  window.location.href = "./autrung.html";
});

var currentQuestionId;
var correctAnswer;
var diemTriThuc = JSON.parse(localStorage.getItem("diemTriThuc")) || 0;
var diemHocTap = JSON.parse(localStorage.getItem("diemHocTap")) || 0;
var currentDiem;

function showQuestion(title, ...options) {
  currentQuestionId = event.target.parentElement.id;
  correctAnswer = options.pop();
  currentDiem = options.pop();
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-content").innerHTML = options
    .map(
      (option) =>
        `<input type="radio" name="answer" value="${option
          .split(")")[0]
          .trim()}">${option}`
    )
    .join("<br>");
  document.getElementById("modal").style.display = "block";
}
function checkAnswer() {
  var selectedAnswer = document.querySelector('input[name="answer"]:checked');
  const messageAnswerQuestion = document.querySelector(
    ".message-question-answer"
  );
  const messageAnswerQuestionBox = document.querySelector(
    ".message-question-answer p"
  );

  if (selectedAnswer) {
    var userAnswer = selectedAnswer.value;
    if (userAnswer === correctAnswer) {
      messageAnswerQuestion.style.display = "block";
      messageAnswerQuestionBox.style.background = "rgb(9, 204, 90)";
      messageAnswerQuestionBox.style.color = "black";
      diemTriThuc += currentDiem;
      diemHocTap += currentDiem;
      localStorage.setItem("diemTriThuc", diemTriThuc);
      localStorage.setItem("diemHocTap", diemHocTap);
      iqTest.innerHTML = diemTriThuc;
      bookTest.innerHTML = diemHocTap;
      diemTri += 1;
      increaseDiemTri.innerHTML = diemTri;
      messageAnswerQuestionBox.innerHTML = `Bạn trả lời đúng rồi!! nhận được ${currentDiem} điểm tri thức, ${currentDiem} điểm học tập và ${1} điểm "Trí"`;
      localStorage.setItem("diem-tri", diemTri);
      setTimeout(() => {
        messageAnswerQuestion.style.display = "none";
      }, 5000);
    } else {
      messageAnswerQuestion.style.display = "block";
      messageAnswerQuestionBox.style.background = "red";
      messageAnswerQuestionBox.style.color = "white";
      messageAnswerQuestionBox.innerHTML = "Bạn đã trả lời sai rồi nhé!!!";
      setTimeout(() => {
        messageAnswerQuestion.style.display = "none";
      }, 3000);
    }
    document.getElementById("modal").style.display = "none";
  } else {
    messageAnswerQuestion.style.display = "block";
    messageAnswerQuestionBox.style.background = "orange";
    messageAnswerQuestionBox.style.color = "white";
    messageAnswerQuestionBox.innerHTML = "Bạn chưa chọn đáp án !!!";
    setTimeout(() => {
      messageAnswerQuestion.style.display = "none";
    }, 2000);
  }
}
