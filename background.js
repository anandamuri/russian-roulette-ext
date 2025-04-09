chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "deleteRandomTab") {
    chrome.tabs.query({}, (tabs) => {
      const totalTabs = tabs.length;
      if (totalTabs === 0) return;

      const numberToDelete = Math.floor(Math.random() * totalTabs) + 1;
      const shuffledTabs = tabs.sort(() => 0.5 - Math.random());
      const tabsToDelete = shuffledTabs.slice(0, numberToDelete);

      for (const tab of tabsToDelete) {
        chrome.tabs.remove(tab.id, () => {
          console.log("Random tab closed:", tab.title || tab.url);
        });
      }
    });
  }
});