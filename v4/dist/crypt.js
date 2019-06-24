function deriveMasterKey(pass)
//takes a (master) password and derives a master key
{
	let key = pass; //for the first pass, we use pass as the 'key', afterwards we are re-hashing the key
	let salt = window.contract.defaultAccount; //we use the user's account as the salt (contract is usually the most reliable place for this to be)
	for (i=0; i<Math.pow(10,2); i++)
	//repeat 1000 times
	{
		key = window.Crypto.pbkdf2Sync(key, salt, Math.pow(10, 2), 256, 'sha512'); //run PBKDF function 100 times, generating a 256b key, using the SHA512 algorithm
	}
	//in total, the derivation process is run 100*1000 = 10^5 times
	window.masterKey = key.toString('hex'); //return hex or derived key
	window.alert(window.masterKey);
}

function encrypt(pass, key)
//takes a plain-text pass and encryption key, returns AES-256 encrypted ciphertext
{
	var cipher = window.Crypto.createCipher('aes256', key); //create an AES-256-CBC cipher object
	var c = cipher.update(pass, 'ascii', 'hex'); //c is a temporary store for ciphertext
	c += cipher.final('hex');
	return c;
}

function decrypt(pass, key)
//takes AES-256 encrypted pass and encryption key, returns plaintext pass
{
	var decipher = window.Crypto.createDecipher('aes256', key);
	var p = decipher.update(pass, 'hex', 'ascii'); //p is a temporary store for pass
	p += decipher.final('ascii');
	return p;
}
