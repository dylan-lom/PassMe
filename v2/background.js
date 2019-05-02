function checkHost(host){
	return chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		return tabs[0].url;
	});
	//return 'localhost';
};
var rule1 = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			//pageUrl: {hostEquals: checkHost()},
			css: ["input[type='password']"]
		})
	],
	actions: [
		//new chrome.declarativeContent.ShowPageAction()
		chrome.browserAction.setPopop();
	]
};	

chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([rule1]);
	});
});






/*chrome.runtime.onInstalled.addListener(function() {
	/*chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		var curl = chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
			return tabs[0].url;
		});
		console.log(curl);
		if (curl == 'https://developer.chrome.com/home'){
			chrome.declarativeContent.ShowPageAction();
		};
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'developer.chrome.com'},
      			})],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
	var hosts = ['localhost', 'gosfordhs.sentral.com.au', 'saml.det.nsw.edu.au', 'google.com'];
	for (var i=0; i<hosts.length; i++){
		checkUrl(hosts[i]);
	};
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

chrome.browserAction.onClicked.addListener(function(tab){
	console.log(tab.url);
});
