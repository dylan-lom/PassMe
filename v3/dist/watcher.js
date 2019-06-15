//Set up onclick/watch events

window.HTElements = {
	//semantic data fields
	web3Version: document.getElementById('w3Version'),
	passCount: document.getElementById('passCount'),
	passMetadata: document.getElementById('passMetadata'),
	passHref: document.getElementById('passHref'),
	passPass: document.getElementById('passPass'),
	//buttons
	getPassSubmit: document.getElementById('getPassSubmit'),
	addPassSubmit: document.getElementById('addPassSubmit'),
}

function getPassCountSubmit(){
	window.getPassCount();
	HTElements.passCount.value = window.passCount;
}
HTElements.getPassSubmit.onclick = getPassCountSubmit;
HTElements.addPassSubmit.onclick = window.addPass(HTElements.passMetadata.value, HTElements.passHref.value, HTElements.passPass.value);
