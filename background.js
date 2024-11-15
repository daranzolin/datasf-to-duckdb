// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openDuckDBShell") {

      chrome.tabs.create({ url: "https://shell.duckdb.org/" }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === "complete") {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: (sqlStatement) => {
                alert(`Copied to clipboard:\n\n${sqlStatement}`);
              },
              args: [message.sqlStatement],
            });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    }
  });
  