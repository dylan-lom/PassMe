# Getting Started

To use the Beta release of PassMe, you'll need the [MetaMask][metamask] extension installed, an account and some ether on the [Kovan Test Network][kovan].

1. Install MetaMask for your browser.

	> [Chrome Webstore](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)  
	> [Firefox Addons](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/)  
	> [Opera Addons](https://addons.opera.com/en/extensions/details/metamask/)  
	> [Source](https://github.com/MetaMask/metamask-extension)  

2. Click through the extension, which will create a new account.

3. Switch networks to the Kovan Test Network.

	![Switching Networks GIF](../pub/start-networks.gif)

4. Access the [Kovan Faucet][faucet], to redeem 1ETH for your account.

5. Access the [PassMe webapp][passme], when prompted for the 'contract address', copy-paste the value below (begginig with a 0x),
   which is where the PassMe smart contract is deployed on the Kovan network.
  

	> 0x987a526b64f5b415f5382c692bcf7c566cc24493

6. The first time you use PassMe, it will prompt you for an initial transaction of ~0.0002ETH. This is required to initialise
   your vault on the blockchain, please accept the transaction, otherwise you may encounter issues when attempting to interact with
   your stored passwords.


[faucet]: https://faucet.kovan.network/
[kovan]: https://kovan-testnet.github.io/website/
[metamask]: https://metamask.io/ 
[passme]: ../demos/web/

