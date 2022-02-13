let showBtn = true
let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
  console.log("start")
  chrome.storage.sync.set({ showBtn });
  chrome.storage.sync.set({ color });
});
