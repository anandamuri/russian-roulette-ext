document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("purgeTab").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "deleteRandomTab" });
  });
});
