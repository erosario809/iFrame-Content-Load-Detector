

window.onload = function (){

	//get user's browser...the try will be priority to get the contentDocument.URL in firefox and a setTimeout for the other browsers
	var browser = (navigator.userAgent.match(/Firefox/i))  == "Firefox" ? "Firefox" : (navigator.userAgent.match(/Chrome/i))  == "Chrome" ? "Chrome" : (navigator.userAgent.match(/Safari/i))  == "Safari" ? "Safari" : (navigator.userAgent.match(/NET/i)) == "NET" ? "NET" : "NONE";
	
	//construct the iframe
	var iframe = document.createElement("iframe");

    iframe.src = "https://prosprit.com";
    iframe.id = "mainIframe";

    //creating this delay for all browsers except Firefox
    var timepast = false;
    setTimeout(function() {
        timepast = true;
    },500);

    document.body.appendChild(iframe);

	//in Firefox the contentDocument.URL will return a string 'about:blank' if no content was loaded but will fail otherwise indicating that it loaded successfully in firefox...for all other browser we'll use a setTimeout to detect if content successfully loaded
	if(browser == 'Firefox'){
		
		iframe.onload = function(){
			try{
				var check = document.getElementById('mainIframe').contentDocument.URL;
			}catch(e){
				console.log("iframe loaded successfully");
			}

			if(check == 'about:blank'){
				//iframe loaded but without content...fire off your process here
				console.log("UNABLE TO LOAD IFRAME CONTENT");
				alert("whohooo iframe didn't load and i detected it");
			}
		};	
		
	}else{

		iframe.onload = function(){
			if(timepast) {
	            console.log("iframe loaded successfully");
	        }
	        else {
	            //unable to load content in iframe...fire off your process here
	            console.log("UNABLE TO LOAD IFRAME CONTENT");
	            alert("whohooo iframe didn't load and i detected it");
	        }
		};

	}
	
}
