function createLecturingNotice() {
  if (document.getElementById("lecturing-notice")) return;
  const lecturingNotice = document.createElement("div");
  lecturingNotice.id = "lecturing-notice";
  lecturingNotice.innerHTML = "강의 중";

  lecturingNotice.style.fontSize = "2rem";
  lecturingNotice.style.position = "fixed";
  lecturingNotice.style.bottom = "2rem";
  lecturingNotice.style.left = "2rem";

  document.getElementById("root").appendChild(lecturingNotice);
}

createLecturingNotice();
