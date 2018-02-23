# iFrame-Content-Load-Detector
Detects if an iframe is loaded along with content requested. 

Synopsis:

Detecting if an iframe (and it's content) loaded successfully can be very challenging. Normally, this could've easily been done by just getting the HTTP headers from the URL. The Cross-Origin and X-Frame-Options creates a catch 22 senario...

To see if the content can be loaded in an iframe, first we would need to see if the Cross-Origin and X-frame-Options header allows for rendering. But you can only get these headers if your are even allowed in the first place. There isn't a response you can use to see if you are not allowed. 

Solution:

Exploring the document object model of an iframe

The final solution will be browser specific. After exploring the DOM of an iframe, there is a property that can only be accessed in firefox (contentDocument). There is another one, (contentWindow), that can be accessed by all browsers but only certain non-meaningfull properties can be accessed.

For Firefox:

get the contentDocument.URL after the iframe has loaded. This property will return a string 'about:blank' when there is no content in the iframe's inner document. This can be used to indicate the iframe content failed to load. 

If the iframe loads successfully, contentDocument.URL will return null. Because the result is null, there is nothing you can do except take this as an indicator that the iframe loaded the content successfully.

For all other browsers:

Since the contentDocument.URL can only be accessed in Firefox and contentWindow is useless, we need a different approach for all other browsers. Because an iframe first reads the HTTP headers of the URL, we know that the time it takes to render content in an iframe can help us determine if it loaded successfully or not. If an iframe were to load successfully, the time it would take to fire off its readyState will be longer than if the iframe is denied the content. As soon as the iframe reads that the Cross-Origin and X-frame-Options in the URL's HTTP header has denied the content, the iframe will immediately fire off its readyState along with console error messages.

To do this all we have to do is set a variable to true a specific amount of time after the iframe loads. If the iframe takes longer to load than the variable being set to true, this indicates that the iframe loaded successfully. If the variable is set to true upon checking for iframe's readyState, this indicates that iframe immediately got a response indicating that access was denied and there is no content in the iframe.

*Note: to do this the iframe must be constructed in Javascript rather than your HTML document.