//constants for toggling div visibility
const hidden = "none";
const visible = "block";

//Set up onclick/watch events
window.HTElements = {
	web3Version: document.getElementById('w3Version'),

	addPass: {
		div: document.getElementById('addPass'),
		metadata: document.getElementById('addPassMetadata'),
		href: document.getElementById('addPassHref'),
		pass: document.getElementById('addPassPass'),
		submit: document.getElementById('addPassSubmit'),

		getVault: document.getElementById('addPass-showGetVault')
	},

	createContract: {
		div: document.getElementById('createContract'),
		address: document.getElementById('contractAddress'),
		submit: document.getElementById('contractAddressSubmit')
	},

	deriveMasterKey: {
		div: document.getElementById('deriveMasterKey'),
		pass: document.getElementById('deriveMasterKeyPass'),
		submit: document.getElementById('deriveMasterKeySubmit')
	},

	getPassCount: {
		count: document.getElementById('passCount'),
		submit: document.getElementById('getPassCountSubmit')
	},

	getPass: {
		div: document.getElementById('getPass'),
		query: document.getElementById('getPassQuery'),
		results: document.getElementById('getPassResults'), //table
		metadata: document.getElementById('getPassMetadata'),
		href: document.getElementById('getPassHref'),
		pass: document.getElementById('getPassPass'),
		submit: document.getElementById('getPassSubmit'),

		getVault: document.getElementById('getPass-showGetVault')
	},

	getVault: {
		div: document.getElementById('getVault')
	},

	loginEthereum: {
		div: document.getElementById('loginEthereum'),
	},

	navButton: {
		addPass: document.getElementById('showAddPass'),
		getPass: document.getElementById('showGetPass')
	},

	noEth: {
		div: document.getElementById('noEth')
	}

}

window.initOnclick = function(){
	HTElements.addPass.submit.onclick = function(){
		window.addPass(HTElements.addPass.metadata.value, HTElements.addPass.href.value, HTElements.addPass.pass.value);
	};
	HTElements.createContract.submit.onclick = function(){
		createContract(HTElements.createContract.address.value);
		divDeriveMasterKey();
	};
	HTElements.deriveMasterKey.submit.onclick = function(){
		window.deriveMasterKey(HTElements.deriveMasterKey.pass.value);
		divGetVault(); //show add pass dialogue
	};
	HTElements.getPass.submit.onclick = function(){
		window.getPass(HTElements.getPass.id.value);
	};
	HTElements.getPass.query.oninput = function(){
		ret = window.search(HTElements.getPass.query.value);
		table = document.createElement('tr');
		for (i=0; i<ret.length; i++){
			row = table.insertRow(i);
			url = row.insertCell(0);
			url.innerHTML = ret[i][1];
			pass = row.insertCell(1);
			pass.innerHTML = ret[i][2];
		}
		HTElements.getPass.results.parentNode.replaceChild(table, HTElements.getPass.results);
		console.log(ret)
	}

	HTElements.getPassCount.submit.onclick = function(){
		window.getPassCount();
	};

	HTElements.addPass.getVault.onclick = function(){
		window.divGetVault();
	};
	HTElements.getPass.getVault.onclick = HTElements.addPass.getVault.onclick;
}

window.divVisibility = function(mode){
	HTElements.addPass.div.style.display = mode;
	HTElements.createContract.div.style.display = mode;
	HTElements.deriveMasterKey.div.style.display = mode;
	HTElements.getPass.div.style.display = mode;
	HTElements.getVault.div.style.display = mode;
	HTElements.loginEthereum.div.style.display = mode;
	HTElements.noEth.div.style.display = mode;
}
