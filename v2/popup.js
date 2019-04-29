function getUrl(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		return tabs[0].url;
	});
};

chrome.tabs.getCurrent(function(currentTab){
	console.log(currentTab.url);
});

/*console.log('hello');
console.log(getUrl());
document.getElementById("siteUrl").value = chrome.tabs.getCurrent(function(){});*/
