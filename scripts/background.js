chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, { file: "removeOpenElements.js" });
});
