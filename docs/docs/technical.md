Technical Documentation
=======================

<h2 id="0">Contents</h2>

[1 Overview of Operation](#1)  
[2 PassMe Smart Contract](#2)  
[2.1 Local Encryption](#2.1)  
[3 Password Hashing Process](#3)  
[3.1 PBKDF2 Master-Key Derivation](#3.1)  
[3.2 AES-256-CBC Password Encryption](#3.2)

<hr>

<h2 id="1">1 Overview of Operation</h2>

The PassMe program uses the decentralised [Ethereum](https://www.ethereum.org/) blockchain as a secure storage location for a user's
 encrypted passwords.

When the application is initially launched, the user is asked to connect their Ethereum address, and enter a master password. Once this
 information is provided, the program fetches their AES encrypted passwords (vault)\* from the blockchain and decrypts their information
 via a derived master key. \*The terminology of a vault is used in the context of other password managers, and although implementation
 details vary, for this document the array of user's passwords stored on the blockchain will be referred to as a vault.

<hr>

<h2 id="2">2 PassMe Smart Contract</h2>

The following security mechanisms operate on the principle that the Ethereum blockchain acts as an immutable, permanent storage space.

Inbuilt into the contract is address authentication, to confirm that the contract only has access to the user's own password vault. This
 is achieved in the `onlyOwnerOf` modifier, which requires that the address of the message sender matches the address that wrote the
 information originally.

Obviously, however, the information stored in the blockchain is publicly accessable, and any user looking at the blockchain's
 transaction history can match a Ethereum address to the passwords it has stored & read the data they wrote the the blockchain. For that
 reason, the contract doesn't store any further information than the securely encrypted password itself (see [section 3](#3)). This
 compromise between security and convinience that was decided necessary to increase the safety of the user's data.


<h3 id="2.1">2.1 Local Encryption</h3>
All encryption/decryption of user data is done on the machine that requests the data &mdash; no hashing in performed in the EVM
 itself, enforcing "host-proof" security (where the security of a user's information relys on the client's choice of encryption),
 as well as preventing issues that may arise during insecure communications between the user and blockchain.

By default, the master-key, used for the encryption of passwords is derived via the
 [PBKDF2 key-derivation function](https://en.wikipedia.org/wiki/PBKDF2), as described in [section 3](#3).

The local encryption model also means that the user's master-password (and derived key) never leave the user's computer.

<hr>  

<h2 id="3">3 Password Hashing Process</h2>

Following common security practices (a non-technical overview of which can be watched [here](https://www.youtube.com/watch?v=w68BBPDAWr8)),
 a user's derived vault key goes through a PBKDF2 SHA-256 hashing process, which recursively hashes a user's master password, salted with
 their Ethereum address to protect user data against brute-force attacks. The purpose of salting the master-key is that it protects the
 user from being vulnerable to a [Rainbow table attack](https://en.wikipedia.org/wiki/Rainbow_table)

It's advised that users familiarise themselves with LastPass's security procedures (available [here](https://assets.cdngetgo.com/60/be/323790b344bf8e631ecb033e4cad/lastpass-technical-whitepaper.pdf)),
 as it provides a good introduction to the security practices that PassMe applies in applicable areas &mdash; server authentication, for
 example, is not an issue that PassMe is concerned with, as it relies on the Ethereum blockchain's underlying secure authentication
 methods for users.

<h3 id="3.1">3.1 PBKDF2 Master-Key Derivation</h3>
Password-Based Key Derivation Function 2 is a <q cite="https://wikipedia.org">key derivation functions with a sliding computational cost,
 used to reduce vulnerabilities to brute force attacks.<q> (wikipedia).

The Master-Key derivation process is as follows:

> Master-Key = PBKDF2(PRF, Password, Salt, Iterations, Key Length)
>
> Where:  
> > *PRF* is a pseudo-random hashing function  
> > *Password* is the master password  
> > *Salt* consists of unique bits of data to ensure that common master passwords do not produce the same master key  
> > *Iterations* is the desired number of iterations to run the *PRF*  
> > *Key Length* is the desired length of the derived key  

For PassMe, this translates into:

> Master-Key = PBKDF2(SHA-512, Master Password, Account, 1000, 256)

Which produces a 256 bit key, appropriate for use in the AES256 encryption process used to encrypt passwords.

This master-key derivation process actually runs 100 times before the final key is determined (100,000 passes in total)

<h3 id="3.2">3.2 AES-256-CBC Password Encryption</h3>

To encrypt passwords PassMe uses the NodeJS crypto library, which in turn depends on the system SSL library.

PassMe uses Solidity's 'string' data type to store data of any size, however longer passwords will increase the [gas](https://www.ethos.io/what-is-ethereum-gas/) required, and it is technically possible to "gas out" the contract, if the gas required exceeds the maximum gas on the network.

This is unlikely, however, as the mainnet's gas limit is [quite high](https://etherscan.io/chart/gaslimit)

The AES Encryption process:

> aes = createCipher('aes256', Master-Key)
> Encrypted-Pass = aes.update(Password, 'ascii', 'hex')
> Encrypted-Pass += .final('hex')

Decryption works in a similar fashion

> aes-decrypt = createDecipher('aes256', Master-Key)
> Password = aes-decrypt.update(Encrypted-Pass, 'hex', 'ascii')
> Password += aes-decrypt.final('ascii')
