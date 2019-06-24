//index.js

//initialise local web3 instance, accounts, etc.
window._web3 = new Web3(web3.currentProvider); //set _web3 to provider used by MetaMask
window.ethereum.enable().then(
  function() {
    console.log('setting account');
    _web3.eth.defaultAccount = web3.eth.accounts[0]
}); //get local account from MetaMask (await Async enable function)

console.log('Using account: '+_web3.eth.defaultAccount);

window.getWeb3Version(); //populate Web3 version
window.initOnclick(); //setup onclick events for buttons
