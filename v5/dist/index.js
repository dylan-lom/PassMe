//index.js
function divNoEth()
{
  //to be displayed when there is no valid Ethereum provider detected
  window.divVisibility(hidden); //hide all divs
  HTElements.noEth.div.style.display = visible; //display noEth dialogue
}

function divLoginEthereum()
{
  window.divVisibility(hidden);

  if (typeof window.ethereum == "undefined"){
    //no ethereum provider in the browser
    divNoEth();
  } else {
    if (!window.ethereum.isMetaMask){
      //ethereum provider is not metamask (support not available yet
      divNoEth();
    } else {
      HTElements.loginEthereum.div.style.display = visible; //show loginEthereum
    }
  }
  window._web3 = new Web3(web3.currentProvider); //set _web3 to provider used by MetaMask
  window.ethereum.enable().then(
    function() {
      _web3.eth.defaultAccount = web3.eth.accounts[0]
      console.log('Using account: '+_web3.eth.defaultAccount);

      _web3.eth.getBlock(0).then(function(block){ //get the genesis block, from which we can get the gas limit
        _web3.defaultGas = block.gasLimit;

        window.getWeb3Version(); //populate Web3 version

        divCreateContract(); //show deriveMasterKey dialogue
      });
  }); //get local account from MetaMask (await Async enable function)
}

function divCreateContract()
{
  //dialogue to create contract object
  window.divVisibility(hidden);
  HTElements.createContract.div.style.display = visible;
}

function divDeriveMasterKey()
{
  //dialogue to derive master key from master pass
  window.divVisibility(hidden);
  HTElements.deriveMasterKey.div.style.display = visible;
}

function divGetVault()
{
  //dialogue + retrieve user's vault
  window.divVisibility(hidden);
  HTElements.getVault.div.style.display = visible;
  window.getVault();
}

function divAddPass()
{
  //dialogue to save a passwword
  window.divVisibility(hidden);
  HTElements.addPass.div.style.display = visible;
}

function divGetPass()
{
  //dialogue to read a password
  window.divVisibility(hidden);
  HTElements.getPass.div.style.display = visible;
}


/* initialise local web3 instance, accounts, etc. */

divVisibility(hidden);
divLoginEthereum();



window.initOnclick(); //setup onclick events for buttons
