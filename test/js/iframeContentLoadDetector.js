window.onload = function() {

    //get user's browser...the try will be priority to get the contentDocument.URL in firefox and a setTimeout for the other browsers
    var browser = (navigator.userAgent.match(/Firefox/i)) == "Firefox" ? "Firefox" : (navigator.userAgent.match(/Chrome/i)) == "Chrome" ? "Chrome" : (navigator.userAgent.match(/Safari/i)) == "Safari" ? "Safari" : (navigator.userAgent.match(/NET/i)) == "NET" ? "NET" : "NONE";

    //construct the iframe
    var iframe = document.createElement("iframe");

    iframe.src = "https://facebook.com";
    iframe.id = "mainIframe";

    //creating this delay for all browsers except Firefox
    var timepast = false;
    setTimeout(function() {
        timepast = true;
    }, 500);

    document.body.appendChild(iframe);

    //this variable switches to true when iframe loads so that if the onload event doesn't fire we can run the secondary check in FF
    var isIframeElementLoaded = false;

    //Do your process here if loadFailure detected
    function loadFailureDetected() {
        console.log("UNABLE TO LOAD IFRAME CONTENT");
        alert("whohooo iframe didn't load and i detected it");
    }

    //in Firefox the contentDocument.URL will return a string 'about:blank' if no content was loaded but will fail otherwise indicating that it loaded successfully in firefox...for all other browser we'll use a setTimeout to detect if content successfully loaded
    if (browser == 'Firefox') {

        iframe.onload = function() {
            isIframeElementLoaded = true;

            try {
                var check = document.getElementById('mainIframe').contentDocument.URL;
            } catch (e) {
                console.log("iframe loaded successfully");
            }

            if (check == 'about:blank') {
                //iframe loaded but without content...fire off your process here
                loadFailureDetected();
            }
        };

        //if iframe onload event doesn't fire we want to check if at least isIframeElementLoaded still false indicating that onload never fired
        var checkCount = 0;

        function checkIfElementLoaded() {
            //run recursion on this function 3 times...if isIframeElementLoaded still false fire off process
            checkCount++
            setTimeout(function() {
                if (isIframeElementLoaded) {
                    //stop recursion no further check
                } else {
                    //recursion to keep runing this function untill element is loaded
                    if (checkCount < 3) {
                        checkIfElementLoaded();
                    } else {
                        //iframe loaded but without content...fire off your process here
                        loadFailureDetected();
                    }
                }
            }, 1000);
        }

        checkIfElementLoaded();



    } else {

        iframe.onload = function() {
            if (timepast) {
                console.log("iframe loaded successfully");
            } else {
                //unable to load content in iframe...fire off your process here
                loadFailureDetected();
            }
        };

        //if iframe onload event doesn't fire we want to check if at least isIframeElementLoaded still false indicating that onload never fired
        var checkCount = 0;

        function checkIfElementLoaded() {
            //run recursion on this function 3 times...if isIframeElementLoaded still false fire off process
            checkCount++
            setTimeout(function() {
                if (isIframeElementLoaded) {
                    //stop recursion no further check
                } else {
                    //recursion to keep runing this function untill element is loaded
                    if (checkCount < 3) {
                        checkIfElementLoaded();
                    } else {
                        //iframe loaded but without content...fire off your process here
                        loadFailureDetected();
                    }
                }
            }, 1000);
        }

    }

}
