chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.frameId === 0) {
    chrome.tabs.executeScript(details.tabId, { file: "removeOpenElements.js" });
  }
});

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, { file: "removeOpenElements.js" });
});
