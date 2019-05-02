/*rules = [{
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			//pageUrl: {hostEquals: checkHost()},
			css: ["input[type='password']"]
		})
	],
	actions: [
		document.getElementById("manualSavePassD").style.visibility = "hidden"
	]
}];*/

/*chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules(rules);
	});
});*/

document.getElementById("manualSavePassD").addEventListener(function){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules(rules);
	});
console.log('hello');
//console.log(getUrl());
//document.getElementById("siteUrl").value = chrome.tabs.getCurrent(function(){});