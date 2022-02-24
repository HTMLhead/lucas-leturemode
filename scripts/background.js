let clicked = false;

chrome.action.onClicked.addListener(async (tab) => {
  let frames = await chrome.webNavigation.getAllFrames({ tabId: tab.id });
  let frame1 = frames[0].frameId;

  // chrome.scripting.executeScript({
  //   target: {
  //     tabId: tab.id,
  //     frameIds: [frame1],
  //   },
  //   files: ["scripts/createLecturingNotice.js"],
  // });
  clicked = !clicked;

  if (clicked) {
    chrome.action.setBadgeText({ text: "강의 중" });
    chrome.action.setBadgeBackgroundColor({ color: "#139ffb" });
  }
  if (!clicked) {
    chrome.action.setBadgeText({ text: "" });
  }

  if (clicked) {
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        frameIds: [frame1],
      },
      files: ["scripts/removeOpenElements.js"],
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

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (
//     tab.url.indexOf("https://lucas.codesquad.kr/") > -1 &&
//     changeInfo.url === undefined &&
//     clicked
//   ) {
//     chrome.tabs.executeScript(tabId, { files: ["scripts/createLecturingNotice.js"] });
//   }
// });
