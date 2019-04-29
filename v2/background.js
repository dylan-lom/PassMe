/*chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'developer.chrome.com'},
      			})],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});*/

/*document.addEventListener("DOMContentLoaded", function() {
	chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
		console.log(tabs[0].url);
	});
});*/

/*chrome.runtime.onInstalled.addListener(function(){
	chrome.addEventListener("DOMContentLoaded", function(){
		chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
			console.log(tabs[0].url);
		});
	);
});*/

chrome.tabs.onUpdated.addListener(function(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		return tabs[0].url;
	});
	
});
