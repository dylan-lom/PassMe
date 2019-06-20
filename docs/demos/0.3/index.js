//index.js

//initialise local web3 instance, accounts, etc.
window._web3 = new Web3(web3.currentProvider); //set _web3 to provider used by MetaMask
window.ethereum.enable(); //get local account from MetaMask
_web3.eth.defaultAccount = web3.eth.accounts[0] //default account, as supplied by MetaMask
console.log('Using account: '+_web3.eth.defaultAccount);

createContract(); //initialise window.contract object (see contract.js)
