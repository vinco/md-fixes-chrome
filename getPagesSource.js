chrome.runtime.sendMessage({
    action: "getSource",
    source: document.getElementById('conceptField').innerHTML
});
