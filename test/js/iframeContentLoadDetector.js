var iframeURL = document.getElementById('mainIframe').src;

window.onload = function (){
	console.log(document.getElementById('mainIframe').contentDocument.URL);
	var check = document.getElementById('mainIframe').contentDocument.URL;
	if(check == 'about:blank'){
		alert("whohooo iframe didn't load and i detected it");
	}
}
