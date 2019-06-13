function createContract()
//assumes that _web3 is available in the global namespace
{
	let _web3 = window._web3;
	let _abi = [
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
															"type": "bytes12"
														},
										{
															"name": "",
															"type": "bytes32"
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
															"name": "_metadata",
															"type": "uint16"
														},
										{
															"name": "_href",
															"type": "bytes12"
														},
										{
															"name": "_pass",
															"type": "bytes32"
														}
									],
						"name": "addPass",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
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

	let _addr = '0x37806cae5fa36eac69d96efe45579565ef61e5c9'; //address that contract is deployed at on the blockchain
	window.contract = new _web3.eth.Contract(_abi, _addr); //create web3 Contract object, to interface with smart contract
}
