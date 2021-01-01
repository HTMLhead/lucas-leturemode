const target = document.querySelector("root");

const stepContainer = document.getElementById("step-list-container");
const lowerStepContainer = document.getElementById("lowerstep-list-container");
// create an observer instance
const removeChildElement = (containerElement) => {
  const childElements = Array.from(containerElement.children);
  const closedElements = childElements.filter(({ id }) => {
    const splittedIdArr = id.split("-");
    return splittedIdArr[splittedIdArr.length - 1] === "CLOSED";
  });
  closedElements.forEach((ele) => ele.remove());
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    removeChildElement(stepContainer);
    removeChildElement(lowerStepContainer);
  });
});

const config = { attributes: true, childList: true, characterData: true };

observer.observe(target, config);
