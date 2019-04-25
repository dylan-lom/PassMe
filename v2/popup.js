console.log('hello');
console.log(chrome.tabs.Tab.url);
document.getElementById("siteUrl").value = chrome.tabs.getCurrent(function(){});
