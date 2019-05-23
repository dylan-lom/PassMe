function web3_init(){
	if (typeof web3 !== 'undefined'){
		web3 = new Web3(web3.currentProvider);
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}
	var coursetroContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"}]);
	var coursetro = coursetroContract.at(   {
     from: web3.eth.accounts[0], 
     data: '0x6080604052348015600f57600080fd5b50609f8061001e6000396000f3fe6080604052600436106039576000357c010000000000000000000000000000000000000000000000000000000090048063f8a8fd6d14603e575b600080fd5b348015604957600080fd5b506050606a565b604051808215151515815260200191505060405180910390f35b6000600190509056fea165627a7a72305820e822849855cd95963bdd3b1196460c42d69d6c72ce913b185e463966e6dacdef0029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 });
	return web3, coursetro;
}

var web3, coursetro = web3_init();
