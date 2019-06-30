//constants for toggling div visibility
const hidden = "none";
const visible = "block";

//Set up onclick/watch events
window.HTElements = {
	web3Version: document.getElementById('w3Version'),

	addPass: {
		div: document.getElementById('addPass'),
		href: document.getElementById('addPassHref'),
		pass: document.getElementById('addPassPass'),
		submit: document.getElementById('addPassSubmit'),

		getVault: document.getElementById('addPass-showGetVault'),
		getPass: document.getElementById('addPass-showGetPass')
	},

	addFirstPass: {
		div: document.getElementById('addFirstPass')
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

		addPass: document.getElementById('getPass-showAddPass'),
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
		window.addPass(HTElements.addPass.href.value, HTElements.addPass.pass.value);
	};

	HTElements.createContract.submit.onclick = function(){
		createContract(HTElements.createContract.address.value);
		divDeriveMasterKey();
	};
	HTElements.deriveMasterKey.submit.onclick = function(){
		window.deriveMasterKey(HTElements.deriveMasterKey.pass.value);
		divGetVault(); //show add pass dialogue
	};

	HTElements.getPass.query.oninput = function(){
		ret = window.search(HTElements.getPass.query.value);
		table = document.createElement('table');
		table.border = "1";
		row = table.insertRow(-1);
		url = document.createElement('th');
		pass = document.createElement('th');
		del = document.createElement('th');
		url.innerHTML = "Site";
		pass.innerHTML = "Password";
		del.innerHTML = "Actions";
		row.appendChild(url); row.appendChild(pass); row.appendChild(del);


		for (i=0; i<ret.length; i++){
			row = table.insertRow(-1);

			url = row.insertCell(0);
			pass = row.insertCell(1);
			vis = row.insertCell(2);
			del = row.insertCell(3);

			url.innerHTML = '<a href="'+ret[i][1]+'">'+ret[i][1]+'</a>';

			// CREATING THE VISIBILITY BUTTON
			let visButton = document.createElement('input');
				visButton.type = "image";
				visButton.src = "show.svg";
				visButton.alt = "Show Password";
				visButton.passId = ret[i][3];
				visButton.pass = ret[i][2]; //stores password text for when it's 'hidden'
				visButton.onclick = function(){
					if (visButton.src.substring(visButton.src.lastIndexOf('/')+1) == "show.svg"){
						visButton.src = "hide.svg";
						console.log('pass'+visButton.passId);
						document.getElementById('pass'+visButton.passId).textContent = visButton.pass;
					} else {
						visButton.src = "show.svg";
						document.getElementById('pass'+visButton.passId).textContent = "*".repeat(visButton.pass.length);
					}
				}
			vis.replaceWith(visButton);

			let delButton = document.createElement('input');
				delButton.type = "image";
				delButton.src = "delete.svg";
				delButton.alt = "Delete";
				delButton.passId = ret[i][3];
				delButton.onclick = function(){
					contract.methods.deletePass(delButton.passId).send({value: contractVal});
				};
			del.replaceWith(delButton);

			pass.innerHTML = '<p id="pass'+delButton.passId+'">'+'*'.repeat(ret[i][2].length);
		}
		HTElements.getPass.results.replaceWith(table); //replace in DOM
		HTElements.getPass.results = table; //replace in HTElements array (for internal use)
		//console.log(ret)
	}

	HTElements.getPassCount.submit.onclick = function(){
		window.getPassCount();
	};

	HTElements.addPass.getVault.onclick = function(){
		window.divGetVault();
	};
	HTElements.getPass.getVault.onclick = HTElements.addPass.getVault.onclick;

	//nav buttons
	HTElements.addPass.getPass.onclick = divGetPass;
	HTElements.getPass.addPass.onclick = divAddPass;
}

window.divVisibility = function(mode){
	HTElements.addPass.div.style.display = mode;
	HTElements.addFirstPass.div.style.display = mode;
	HTElements.createContract.div.style.display = mode;
	HTElements.deriveMasterKey.div.style.display = mode;
	HTElements.getPass.div.style.display = mode;
	HTElements.getVault.div.style.display = mode;
	HTElements.loginEthereum.div.style.display = mode;
	HTElements.noEth.div.style.display = mode;
}
