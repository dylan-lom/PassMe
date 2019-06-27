window.createContract = function(_addr)
//assumes that _web3 is available in the global namespace
{
	console.log('creating contract at: '+_addr);
	let _web3 = window._web3;
	let _abi = [
		{
			"constant": true,
			"inputs": [],
			"name": "getPassMeFee",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_metadata",
					"type": "uint16"
				},
				{
					"name": "_href",
					"type": "string"
				},
				{
					"name": "_pass",
					"type": "string"
				}
			],
			"name": "addPass",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getPasswds",
			"outputs": [
				{
					"name": "",
					"type": "uint64[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getPassCount",
			"outputs": [
				{
					"name": "",
					"type": "uint64"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_passId",
					"type": "uint64"
				}
			],
			"name": "getPass",
			"outputs": [
				{
					"name": "",
					"type": "uint16"
				},
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_fee",
					"type": "uint256"
				}
			],
			"name": "setPassMeFee",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "id",
					"type": "uint64"
				}
			],
			"name": "PassAdded",
			"type": "event"
		}
	];
	window.contract = new _web3.eth.Contract(_abi, _addr); //create web3 Contract object, to interface with smart contract
	window.contract.methods.getPassMeFee.call().then(function(_fee){
		window.contractVal = window._web3.utils.hexToNumber(_fee);
	}); //amount to pay for each txn
	window.contract._defaultGasPrice = Math.pow(10, 9);
	window.contract._defaultGas = window._web3.defaultGas;
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

/* legacy (v0.4-) function
window.getPass = function(_id){
	window.contract.methods.getPass(_id).call().then(function(r){
		console.log(r);
		console.log(r[1]+'\n'+r[2]);
		HTElements.getPass.metadata.innerHTML = r[0];
		HTElements.getPass.href.innerHTML = decrypt(r[1], masterKey);
		HTElements.getPass.pass.innerHTML = decrypt(r[2], masterKey);
	});
}
*/
window.getPass = function(query)
{
	res = search(query);
	for (i=0; i<res.length; i++){
		console.log(res[i]);
	}
}

window.getVault = function(c){ //if c is true, display the next screen (add pass)
	if (_web3.defaultAccount == undefined){
		ethEnable();
	}
	window.contract.methods.getPasswds.call().then(function(_passwds){
		//getPasswds returns an array of password id
		console.log('_passwds: '+ _passwds)
		var URLArray = []
		var vault = []
		for ( i=0; i < _passwds.length; i++ )
		//iterate through ids in _passwds; retrieve to local vault
		{
			let _id = window._web3.utils.hexToNumber(_passwds[i]) -1; //for some reason the value the contract gives is +1 :/
			window.contract.methods.getPass(_id).call().then(function(_pass){
				_pass[1] = decrypt(_pass[1], window.masterKey);
				_pass[2] = decrypt(_pass[2], window.masterKey);
				URLArray.push(_pass[1]); //to be searched through
				vault.push(_pass);
			});
		}

		window.URLArray = URLArray;
		window.vault = vault;

		if (c) {
			divAddPass();
		}
	})
};

window.getWeb3Version = function(){
	HTElements.web3Version.innerHTML = window._web3.version;
}

window.ethEnable = async function(){
	window.ethereum.enable().then(
    function() {
      _web3.eth.defaultAccount = web3.eth.accounts[0]
      console.log('Using account: '+_web3.eth.defaultAccount);

      _web3.eth.getBlock(0).then(function(block){ //get the genesis block, from which we can get the gas limit
      	_web3.defaultGas = block.gasLimit;
			});
    });
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
