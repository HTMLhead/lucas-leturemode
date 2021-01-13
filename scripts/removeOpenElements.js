function findAndRemoveEle() {
  const stepContainer = document.getElementById("step-list-container");
  const lowerStepContainer = document.getElementById("lowerstep-list-container");

  if (stepContainer) {
    removeChildElement(stepContainer);
  }
  if (lowerStepContainer) {
    removeChildElement(lowerStepContainer);
  }
}

function removeChildElement(containerElement) {
  const childElements = Array.from(containerElement.children);
  const closedElements = childElements.filter(({ id }) => {
    const splittedIdArr = id.split("-");
    return splittedIdArr[splittedIdArr.length - 1] !== "OPEN";
  });
  closedElements.forEach((ele) => ele.remove());
}

findAndRemoveEle();
