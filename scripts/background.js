let clicked = false;

chrome.browserAction.onClicked.addListener(function () {
  clicked = !clicked;
  chrome.tabs.onUpdated.addListener(() => {
    if (clicked) {
      chrome.tabs.executeScript({
        file: "scripts/removeOpenElements.js",
      });
    }
  });
});
