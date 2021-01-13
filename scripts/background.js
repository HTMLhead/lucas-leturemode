let clicked = false;

chrome.browserAction.onClicked.addListener(function () {
  clicked = !clicked;
  if (clicked) {
    chrome.tabs.executeScript({
      file: "scripts/createLecturingNotice.js",
    });
  }
  chrome.tabs.onUpdated.addListener(() => {
    if (clicked) {
      chrome.tabs.executeScript({
        file: "scripts/removeOpenElements.js",
      });
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    tab.url.indexOf("https://lucas.codesquad.kr/") > -1 &&
    changeInfo.url === undefined &&
    clicked
  ) {
    chrome.tabs.executeScript(tabId, { file: "scripts/createLecturingNotice.js" });
  }
});
