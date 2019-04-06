chrome.runtime.onInstalled.addListener(function() { //main
	console.log("installed");
	/*chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){ //when page changes, callback fn
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({ //if page matches
				pageUrl: {hostEquals: 'developer.chrome.com'};
			})],
				actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});*/
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});