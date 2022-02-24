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

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: treatElement,
    args: [clicked ? "none" : "flex"],
  });

  chrome.tabs.onUpdated.addListener(() => {
    if (clicked) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: treatElement,
        args: [clicked ? "none" : "flex"],
      });
    }
  });
});

function treatElement(displayStr) {
  const stepContainer = document.getElementById("step-list-container");
  const lowerStepContainerList = document.querySelectorAll("#lowerstep-list-container");

  if (stepContainer) {
    treatChildEle(stepContainer, displayStr);
  }
  if (lowerStepContainerList.length > 0)
    lowerStepContainerList.forEach((lowerStepContainer) => {
      treatChildEle(lowerStepContainer, displayStr);
    });

  function treatChildEle(container, display) {
    const childElements = Array.from(container.children);
    const closedElements = childElements.filter(({ id }) => {
      const splittedIdArr = id.split("-");
      return splittedIdArr[splittedIdArr.length - 1] !== "OPEN";
    });
    closedElements.forEach((ele) => (ele.style.display = display));
  }
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
