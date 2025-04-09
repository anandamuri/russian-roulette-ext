chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "deleteRandomTab") {
    chrome.tabs.query({}, (tabs) => {
      if (tabs.length === 0) return;
      const randomIndex = Math.floor(Math.random() * tabs.length);
      const randomTab = tabs[randomIndex];
      chrome.tabs.remove(randomTab.id, () => {
        console.log("Random tab closed:", randomTab.title || randomTab.url);
      });
    });
  }
});