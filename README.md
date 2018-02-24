# iFrame-Content-Load-Detector
Detects if an iframe is loaded along with content requested. 

Synopsis:

Detecting if an iframe (and it's content) loaded successfully can be very challenging. Normally, this could've easily been done by just getting the HTTP headers from the URL. The Cross-Origin and X-Frame-Options creates a catch 22 senario...

To see if the content can be loaded in an iframe, first we would need to see if the Cross-Origin and X-frame-Options header allows for rendering. But you can only get these headers if your are even allowed in the first place. There isn't a response you can use to see if you are not allowed. 

Solution: Can only be done in Firefox

Exploring the document object model of an iframe

The final solution will be browser specific. After exploring the DOM of an iframe, there is a property that can only be accessed in firefox (contentDocument). There is another one, (contentWindow), that can be accessed by all browsers but only certain non-meaningfull properties can be accessed. This makes contentWindow useless for any browser

For Firefox:

get the contentDocument.URL after the iframe has loaded. This property will return a string 'about:blank' when there is no content in the iframe's inner document. This can be used to indicate the iframe content failed to load. 

If the iframe loads successfully, contentDocument.URL will return null. Because the result is null, there is nothing you can do except take this as an indicator that the iframe loaded the content successfully.

*Note: to do this the iframe must be constructed in Javascript rather than your HTML document. Also this will only work if the onload event upon loading the iframe. Mix content sites will cause for this event to never fire even after load. You can't detect and event that never fires.