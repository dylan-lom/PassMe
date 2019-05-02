function getUrl(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		return tabs[0].url;
	});
};
chrome.browserAct

console.log('hello');
//console.log(getUrl());
//document.getElementById("siteUrl").value = chrome.tabs.getCurrent(function(){});