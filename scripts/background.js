let clicked = false;

chrome.action.onClicked.addListener(async (tab) => {
  clicked = !clicked;

  if (clicked) {
    chrome.action.setBadgeText({ text: "강의 중" });
    chrome.action.setBadgeBackgroundColor({ color: "#139ffb" });
  }
  if (!clicked) {
    chrome.action.setBadgeText({ text: "" });
  }
  console.log(clicked);
  if (clicked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: findAndHideEle,
    });
  }

  if (!clicked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: findAndRevealEle,
    });
  }

  chrome.tabs.onUpdated.addListener(() => {
    if (clicked) {
      console.log("played");
      chrome.scripting.executeScript({
        files: ["scripts/removeOpenElements.js"],
      });
    }
  });
});

function findAndRevealEle() {
  const stepContainer = document.getElementById("step-list-container");
  const lowerStepContainer = document.getElementById("lowerstep-list-container");

  if (stepContainer) {
    revealChildElement(stepContainer);
  }
  if (lowerStepContainer) {
    revealChildElement(lowerStepContainer);
  }
}

function findAndHideEle() {
  const stepContainer = document.getElementById("step-list-container");
  const lowerStepContainer = document.getElementById("lowerstep-list-container");
  console.log(stepContainer);
  if (stepContainer) {
    removeChildElement(stepContainer);
  }
  if (lowerStepContainer) {
    removeChildElement(lowerStepContainer);
  }
}

function revealChildElement(containerElement) {
  const childElements = Array.from(containerElement.children);
  const closedElements = childElements.filter(({ id }) => {
    const splittedIdArr = id.split("-");
    return splittedIdArr[splittedIdArr.length - 1] !== "OPEN";
  });
  closedElements.forEach((ele) => (ele.style.display = "none"));
}

function removeChildElement(containerElement) {
  const childElements = Array.from(containerElement.children);
  const closedElements = childElements.filter(({ id }) => {
    const splittedIdArr = id.split("-");
    return splittedIdArr[splittedIdArr.length - 1] !== "OPEN";
  });
  closedElements.forEach((ele) => (ele.style.display = "none"));
}

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (
//     tab.url.indexOf("https://lucas.codesquad.kr/") > -1 &&
//     changeInfo.url === undefined &&
//     clicked
//   ) {
//     chrome.tabs.executeScript(tabId, { files: ["scripts/createLecturingNotice.js"] });
//   }
// });
