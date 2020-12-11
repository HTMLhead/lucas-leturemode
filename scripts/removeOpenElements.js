const stepContainer = document.getElementById("step-list-container");
const lowerStepContainer = document.getElementById("lowerstep-list-container");

const removeChildElement = (containerElement) => {
  const childElements = Array.from(containerElement.children);
  const closedElements = childElements.filter(({ id }) => {
    const splittedIdArr = id.split("-");
    return splittedIdArr[splittedIdArr.length - 1] === "CLOSED";
  });
  closedElements.forEach((ele) => ele.remove());
};

removeChildElement(stepContainer);
removeChildElement(lowerStepContainer);
