window.createContract = function(_addr)
//assumes that _web3 is available in the global namespace
{
	console.log('creating contract at: '+_addr);
	let _web3 = window._web3;
	let _abi = [
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
	window.contractVal = _web3.utils.toWei('0.0002'); //amount to pay for each txn, convert ether => wei
	window.contract._defaultGasPrice = Math.pow(10, 9);
	window.contract._defaultGas = 210000;
}
