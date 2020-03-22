chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'meet.google.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  chrome.storage.sync.set(
      {
          meet_deny_entry: false,
          meet_auto_unmute: false,
          meet_blacklist_info: {
              enabled: false,
              list: []
          }
      }
      );
});
