function createLecturingNotice() {
  const lecturingNotice = document.createElement("div");
  lecturingNotice.id = "lecturing-notice";
  lecturingNotice.innerHTML = "강의 중";

  lecturingNotice.style.fontSize = "2rem";
  lecturingNotice.style.position = "fixed";
  lecturingNotice.style.bottom = "10rem";
  lecturingNotice.style.left = "2rem";

  if (!document.getElementById("lecturing-notice")) {
    console.log("hi");
    document.getElementById("root").appendChild(lecturingNotice);
  }
}

createLecturingNotice();
