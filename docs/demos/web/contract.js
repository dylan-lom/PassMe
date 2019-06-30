window.passMeMetadata = 0; //ID's Pass as written by v0.x of PassMe contract
window.passDeleted = 1;
window.createContract = function(_addr)
//assumes that _web3 is available in the global namespace
{
	if(typeof contract !== 'undefined'){
		return;
	}
	console.log('creating contract at: '+_addr);
	let _web3 = window._web3;
	let _abi = [{"constant":true,"inputs":[],"name":"getPassMeFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_metadata","type":"uint16"},{"name":"_href","type":"string"},{"name":"_pass","type":"string"}],"name":"addPass","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPasswds","outputs":[{"name":"","type":"uint64[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_passId","type":"uint64"}],"name":"deletePass","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPassCount","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"addFirstPass","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_passId","type":"uint64"}],"name":"getPass","outputs":[{"name":"","type":"uint16"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setPassMeFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint64"}],"name":"PassAdded","type":"event"}];
	window.contract = new _web3.eth.Contract(_abi, _addr); //create web3 Contract object, to interface with smart contract
	window.contract.methods.getPassMeFee.call().then(function(_fee){
		window.contractVal = window._web3.utils.hexToNumber(_fee);
	}); //amount to pay for each txn
	window.contract._defaultGasPrice = Math.pow(10, 9);
	window.contract._defaultGas = window._web3.defaultGas;
}

window.addPass = function(_href, _pass){
	metadata = window.passMeMetadata;
	href = window.encrypt(_href, window.masterKey);
	pass = window.encrypt(_pass, window.masterKey);
	window.contract.methods.addPass(metadata, href, pass).send({value: window.contractVal});
}

window.getPassCount = function(){
	window.contract.methods.getPassCount().call().then(function(r){HTElements.getPassCount.count.innerHTML = window._web3.utils.hexToNumber(r);});
}

window.getVault = function(c){ //if c is true, display the next screen (add pass)

	window.contract.methods.getPasswds.call().then(function(_passwds){
		//getPasswds returns an array of password id
		console.log('_passwds: '+ _passwds);
		if (_passwds.length < 2){
			console.log('!');
			divAddFirstPass();
		}
		var URLArray = [];
		var vault = [];
		for ( i=0; i < _passwds.length; i++ )
		//iterate through ids in _passwds; retrieve to local vault
		{
			let _id = window._web3.utils.hexToNumber(_passwds[i]) -1; //for some reason the value the contract gives is +1 :/
			window.contract.methods.getPass(_id).call().then(function(_pass){
				if (_web3.utils.hexToNumber(_pass[0]) == passDeleted){
					return; //this pass has been marked as deleted
				}
				_pass[1] = decrypt(_pass[1], window.masterKey);
				_pass[2] = decrypt(_pass[2], window.masterKey);

				_pass[3] = _id;
				URLArray.push(_pass[1]); //to be searched through
				vault.push(_pass);
			});
		}

		window.URLArray = URLArray;
		window.vault = vault;

		// clears any currently visible passwords in search results table
		let _table = document.createElement('table');
		HTElements.getPass.results.replaceWith(_table);
		HTElements.getPass.results = _table;

		console.log('!');
		if (c==1) {
			divGetPass();
		} else if (c==2) {
			divAddPass();
		}
	})
};

window.getWeb3Version = function(){
	HTElements.web3Version.innerHTML = window._web3.version;
}

window.search = function(query){
	//search URLS of vault
	regex = RegExp('.*'+query+'.*');
	var results = [];
	for (i=0; i<URLArray.length; i++){
		if (regex.test(URLArray[i])){ //.test returns true if matches
			results.push(vault[i]); //add the passwd object (from vault) to results
		}
	}
	return results;
}
