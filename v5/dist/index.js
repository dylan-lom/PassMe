//index.js

//initialise local web3 instance, accounts, etc.
window._web3 = new Web3(web3.currentProvider); //set _web3 to provider used by MetaMask
window.ethereum.enable().then(
  function() {
    _web3.eth.defaultAccount = web3.eth.accounts[0]
    console.log('Using account: '+_web3.eth.defaultAccount);
}); //get local account from MetaMask (await Async enable function)

_web3.eth.getBlock(0).then(function(block){ //get the genesis block, from which we can get the gas limit
  _web3.defaultGas = block.gasLimit;

})
window.getWeb3Version(); //populate Web3 version
window.initOnclick(); //setup onclick events for buttons
