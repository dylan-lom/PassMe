Technical Documentation
=======================

<h2 id="0">0 Contents</h2>

[1 PassMe Smart Contract](#1)  
[2 Password Hashing Process](#2)  

<h2 id="1">1 PassMe Smart Contract</h2>

The Ethereum blockchain serves as an immutable storage space where all encrypted user data is stored.

Inbuilt into the contract is address authentication, to confirm that the contract only has access to the user's own password vault. This
 is achieved in the `onlyOwnerOf` modifier, which requires that the address of the message sender matches the address that wrote the
 information originally.

Obviously, however, the information stored in the blockchain is publicly accessable, and any user looking at the blockchain's
 transaction history can match a Ethereum address to the passwords it has stored & read the data they wrote the the blockchain. For that
 reason, the contract doesn't store any further information than the securely encrypted password itself (see
 [Password Hasing Process](#2)). This is a compromise between security and convinience that I decided was necessary to increase the
 safety of user data.

<h2 id="2">2 Password Hashing Process</h2>

Following common security practices ([non-technical overview](https://www.youtube.com/watch?v=w68BBPDAWr8)), all passwords go through
 a PBKDF2 SHA-256 hashing process, which recursively hashes the passwords 10^1000 times, in order to protect user data from brute-
 force attacks. Technical documentation of LastPass's security procedures is available [here](https://assets.cdngetgo.com/60/be/323790b344bf8e631ecb033e4cad/lastpass-technical-whitepaper.pdf),
 and provides a good introduction to the security practices that PassMe applies in applicable areas &mdash; server authentication, for
 example, is not an issue that PassMe is concerned with, as it relies on the Ethereum blockchain's underlying secure authentication
 methods for users.
