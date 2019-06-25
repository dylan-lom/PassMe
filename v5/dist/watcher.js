//constants for toggling div visibility
const hidden = "none";
const visible = "block";

//Set up onclick/watch events
window.HTElements = {
	web3Version: document.getElementById('w3Version'),

	addPass: {
		div: document.getElementById('addPass'),
		metadata: document.getElementById('addPassMetadata'),
		href: document.getElementById('addPassHref'),
		pass: document.getElementById('addPassPass'),
		submit: document.getElementById('addPassSubmit')
	},

	createContract: {
		div: document.getElementById('createContract'),
		address: document.getElementById('contractAddress'),
		submit: document.getElementById('contractAddressSubmit')
	},

	deriveMasterKey: {
		div: document.getElementById('deriveMasterKey'),
		pass: document.getElementById('deriveMasterKeyPass'),
		submit: document.getElementById('deriveMasterKeySubmit')
	},

	getPassCount: {
		count: document.getElementById('passCount'),
		submit: document.getElementById('getPassCountSubmit')
	},

	getPass: {
		div: document.getElementById('getPass'),
		url: document.getElementById('getPassUrl'),
		metadata: document.getElementById('getPassMetadata'),
		href: document.getElementById('getPassHref'),
		pass: document.getElementById('getPassPass'),
		submit: document.getElementById('getPassSubmit')
	},

	getVault: {
		div: document.getElementById('getVault')
	},

	loginEthereum: {
		div: document.getElementById('loginEthereum'),
	},

	navButton: {
		addPass: document.getElementById('showAddPass'),
		getPass: document.getElementById('showGetPass')
	},

	noEth: {
		div: document.getElementById('noEth')
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
	HTElements.addPass.submit.onclick = function(){
		window.addPass(HTElements.addPass.metadata.value, HTElements.addPass.href.value, HTElements.addPass.pass.value);
	};
	HTElements.createContract.submit.onclick = function(){
		createContract(HTElements.createContract.address.value);
		divDeriveMasterKey();
	};
	HTElements.deriveMasterKey.submit.onclick = function(){
		window.deriveMasterKey(HTElements.deriveMasterKey.pass.value);
		divGetVault(); //show add pass dialogue
	};
	HTElements.getPass.submit.onclick = function(){
		window.getPass(HTElements.getPass.id.value);
	};
	HTElements.getPassCount.submit.onclick = function(){
		window.getPassCount();
	};
}

window.divVisibility = function(mode){
	HTElements.addPass.div.style.display = mode;
	HTElements.createContract.div.style.display = mode;
	HTElements.deriveMasterKey.div.style.display = mode;
	HTElements.getPass.div.style.display = mode;
	HTElements.loginEthereum.div.style.display = mode;
	HTElements.noEth.div.style.display = mode;
}
