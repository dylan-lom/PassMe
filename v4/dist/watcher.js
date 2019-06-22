//Set up onclick/watch events
window.HTElements = {
	web3Version: document.getElementById('w3Version'),
	addPass: {
		metadata: document.getElementById('passMetadata'),
		href: document.getElementById('passHref'),
		pass: document.getElementById('passPass'),
		submit: document.getElementById('addPassSubmit')
	},
	createContract: {
		address: document.getElementById('contractAddress'),
		submit: document.getElementById('contractAddressSubmit')
	},
	getPassCount: {
		count: document.getElementById('passCount'),
		submit: document.getElementById('getPassCountSubmit')
	},
	getPass: {
		id: document.getElementById('gPassId'),
		metadata: document.getElementById('gPassMetadata'),
		href: document.getElementById('gPassHref'),
		pass: document.getElementById('gPassPass'),
		submit: document.getElementById('getPassSubmit')
	}
}

window.addPass = function(_metadata, _href, _pass){
	window.contract.methods.addPass(_metadata, window._web3.utils.asciiToHex(_href, 12), window._web3.utils.asciiToHex(_pass, 32)).send({value: window.contractVal});
}

window.getPassCount = function(){
	window.contract.methods.getPassCount().call().then(function(r){HTElements.getPassCount.count.innerHTML = window._web3.utils.hexToNumber(r);});
}

window.getPass = function(_id){
	window.contract.methods.getPass(_id).call().then(function(r){
		HTElements.getPass.metadata.innerHTML = r[0];
		HTElements.getPass.href.innerHTML = window._web3.utils.hexToAscii(r[1]);
		HTElements.getPass.pass.innerHTML = window._web3.utils.hexToAscii(r[2]);
	});
}

window.getWeb3Version = function(){
	HTElements.web3Version.innerHTML = window._web3.version;
}

window.initOnclick = function(){
	HTElements.addPass.submit.onclick = function(){window.addPass(HTElements.addPass.metadata.value, HTElements.addPass.href.value, HTElements.addPass.pass.value);}
	HTElements.createContract.submit.onclick = function(){createContract(HTElements.createContract.address.value);};
	HTElements.getPass.submit.onclick = function(){window.getPass(HTElements.getPass.id.value)};
	HTElements.getPassCount.submit.onclick = function(){window.getPassCount();}
}
