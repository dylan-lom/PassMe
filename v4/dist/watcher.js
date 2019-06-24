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
	deriveMasterKey: {
		pass: document.getElementById('deriveMasterKeyPass'),
		submit: document.getElementById('deriveMasterKeySubmit')
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
	metadata = _metadata;
	href = window.encrypt(_href, window.masterKey);
	pass = window.encrypt(_pass, window.masterKey);
	window.contract.methods.addPass(metadata, href, pass).send({value: window.contractVal});
}

window.getPassCount = function(){
	window.contract.methods.getPassCount().call().then(function(r){HTElements.getPassCount.count.innerHTML = window._web3.utils.hexToNumber(r);});
}

window.getPass = function(_id){
	window.contract.methods.getPass(_id).call().then(function(r){
		console.log(r);
		console.log(r[1]+'\n'+r[2]);
		HTElements.getPass.metadata.innerHTML = r[0];
		HTElements.getPass.href.innerHTML = decrypt(r[1], masterKey);
		HTElements.getPass.pass.innerHTML = decrypt(r[2], masterKey);
	});
}

window.getWeb3Version = function(){
	HTElements.web3Version.innerHTML = window._web3.version;
}

window.initOnclick = function(){
	HTElements.addPass.submit.onclick = function(){window.addPass(HTElements.addPass.metadata.value, HTElements.addPass.href.value, HTElements.addPass.pass.value);}
	HTElements.createContract.submit.onclick = function(){createContract(HTElements.createContract.address.value);};
	HTElements.deriveMasterKey.submit.onclick = function(){window.deriveMasterKey(HTElements.deriveMasterKey.pass.value);};
	HTElements.getPass.submit.onclick = function(){window.getPass(HTElements.getPass.id.value)};
	HTElements.getPassCount.submit.onclick = function(){window.getPassCount();}
}
